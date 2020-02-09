import React from "react";

import { FeedList } from "../App";
import { useFeeds } from "./Feed/FeedContext";
import FeedItemLink, { Props as FeedItemLinkProps } from "./Feed/FeedItemLink";

interface Props {
  feeds: FeedList;
  addFeed: (url: string) => void;
}

const Home = ({ addFeed }: Props) => {
  const [newFeedURL, setNewFeedURL] = React.useState<string>("");
  const { feeds } = useFeeds();
  const allFeedItems: FeedItemLinkProps[] = feeds.reduce(
    (all: FeedItemLinkProps[], feed) => {
      const newItems = feed.items.map(i => {
        return {
          title: i.title,
          link: i.link,
          date: i.isoDate,
          author: feed.title
        };
      });
      return [...all, ...newItems];
    },
    []
  );

  const sortedFeedItems = allFeedItems.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate.getTime() > bDate.getTime() ? -1 : 1;
  });

  const handleFormSubmit = () => {
    addFeed(newFeedURL);
    setNewFeedURL("");
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="flex"
      >
        <input
          className="border border-gray-300 border-solid rounded-md py-2 px-4 mr-2 flex-1"
          type="text"
          value={newFeedURL}
          placeholder="https://the-best-articles.io/feed"
          onChange={e => setNewFeedURL(e.currentTarget.value)}
        />
        <button className="py-2 px-5 bg-green-600 text-white rounded-md">
          Add RSS
        </button>
      </form>
      <hr className="my-10" />

      {sortedFeedItems.map(item => {
        return (
          <FeedItemLink
            key={item.title}
            title={item.title}
            link={item.link}
            date={item.date}
            author={item.author}
          />
        );
      })}
    </>
  );
};

export default Home;
