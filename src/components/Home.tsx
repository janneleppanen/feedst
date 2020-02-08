import React from "react";

import { FeedList } from "../App";

interface Props {
  feeds: FeedList;
  setFeeds: Function;
}

const FEED_PARSE_URL = process.env.REACT_APP_FEED_PARSE_URL;

const Home = ({ feeds, setFeeds }: Props) => {
  const [newFeedURL, setNewFeedURL] = React.useState<string>("");

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
  );
};

export default Home;
