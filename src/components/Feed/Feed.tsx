import React from "react";

import { useFeeds } from "./FeedContext";
import FeedItemLink from "./FeedItemLink";

interface Props {
  match: {
    params: {
      feedId: string;
    };
  };
}

const Feed = (props: Props) => {
  const { feeds } = useFeeds();
  const feedId = parseInt(props.match.params.feedId);
  const feed = feeds[feedId] ? feeds[feedId] : null;

  if (!feed) {
    return <p>Feed not found.</p>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold leading-tight mb-6">{feed.title}</h1>
      <p className="text-xl text-gray-700 mb-16">{feed.description}</p>

      {feed.items.map(item => (
        <FeedItemLink key={item.title} item={item} />
      ))}
    </>
  );
};

export default Feed;
