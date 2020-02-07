import React from "react";

import Sidebar from "./components/Sidebar";

export interface Feed {
  title: string;
  image?: {
    url: string;
  };
  items: FeedItem[];
}

export interface FeedItem {
  title: string;
  link: string;
  content: string;
}

export type FeedList = Feed[];

const FEED_PARSE_URL = process.env.REACT_APP_FEED_PARSE_URL;

const App = () => {
  const [feeds, setFeeds] = React.useState<FeedList>(
    JSON.parse(localStorage.getItem("feeds") || "") || []
  );
  const [newFeedURL, setNewFeedURL] = React.useState<string>("");

  React.useEffect(() => {
    localStorage.setItem("feeds", JSON.stringify(feeds));
    return () => {};
  }, [feeds]);

  const handleFormSubmit = async () => {
    await loadFeed(newFeedURL);
    setNewFeedURL("");
  };

  const loadFeed = async (url: string) => {
    const res = await fetch(FEED_PARSE_URL || "", {
      method: "POST",
      body: JSON.stringify({ rssFeeds: [url] })
    });
    const data = await res.json();
    const newFeed = data[url];
    setFeeds([...feeds, newFeed]);
  };

  return (
    <div className="h-screen flex">
      <Sidebar feeds={feeds} />
      <main className="flex-1">
        <div className="max-w-screen-lg mx-auto my-10 p-10">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <input
              className="border border-gray-300 border-solid rounded-md p-2 mr-2"
              type="text"
              value={newFeedURL}
              onChange={e => setNewFeedURL(e.currentTarget.value)}
            />
            <button className="py-2 px-5 bg-green-600 text-white rounded-md">
              Add new feed
            </button>
          </form>

          {feeds.map(feed => (
            <div key={feed.title}>
              <h2 className="text-2xl font-bold my-6">
                {feed.title} <small>({feed.items.length})</small>
              </h2>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
