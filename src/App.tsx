import React from "react";

const INITIAL_FEEDS = [
  "https://feed.syntax.fm/rss",
  "https://rss.simplecast.com/podcasts/279/rss"
];

interface Feed {
  title: string;
  items: FeedItem[];
}

interface FeedItem {
  title: string;
  link: string;
  content: string;
}

type FeedList = Feed[];

const App = () => {
  const [feeds, setFeeds] = React.useState<FeedList>([]);

  React.useEffect(() => {
    const data = JSON.stringify({
      rssFeeds: INITIAL_FEEDS
    });

    fetch("http://localhost:3000/.netlify/functions/parse-rss-feeds", {
      method: "POST",
      body: data
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const allFeeds = [];
        for (let feed in response) {
          allFeeds.push(response[feed]);
        }
        setFeeds(allFeeds);
      });

    return () => {};
  }, []);

  return (
    <div className="max-w-screen-md mx-auto">
      {feeds.map(feed => (
        <div>
          <h2 className="text-2xl font-bold my-6">{feed.title}</h2>
          {feed.items.map(feedItem => (
            <div>
              <a
                className="block bg-orange-300 p-4 mb-2 hover:bg-orange-400"
                href={feedItem.link}
              >
                {feedItem.title}
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
