import React from "react";

import { FeedList } from "../../App";

const FEED_PARSE_URL = process.env.REACT_APP_FEED_PARSE_URL;

const FeedContext = React.createContext({
  feeds: [] as FeedList,
  addFeed: (url: string) => {}
});

export const FeedProvider: React.FC = ({ children }) => {
  const [feeds, setFeeds] = React.useState<FeedList>([]);

  React.useEffect(() => {
    const storedFeeds = localStorage.getItem("feeds");

    if (!storedFeeds) {
      setFeeds([]);
    } else {
      setFeeds(JSON.parse(storedFeeds));
    }

    return () => {};
  }, []);

  const addFeed = async (url: string) => {
    const res = await fetch(FEED_PARSE_URL || "", {
      method: "POST",
      body: JSON.stringify({ rssFeeds: [url] })
    });
    const data = await res.json();
    const newFeed = data[url];
    setFeeds([...feeds, newFeed]);
  };

  return (
    <FeedContext.Provider value={{ feeds, addFeed }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeeds = () => {
  return React.useContext(FeedContext);
};
