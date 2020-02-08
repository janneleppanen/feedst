import React from "react";

import { useFeeds } from "../components/Feed/FeedContext";

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
    <div>
      <h1 className="text-4xl font-bold leading-tight mb-6">{feed.title}</h1>
      <p className="text-xl text-gray-700 mb-16">{feed.description}</p>

      {feed.items.map(item => (
        <a
          key={item.title}
          href={item.link}
          className="border-solid block text-lg -mx-4 p-4 hover:bg-green-200"
        >
          <h2 className="font-bold mb-1">{item.title}</h2>
          <p className="text-gray-500">
            {item.pubDate
              .split(" ")
              .slice(0, 4)
              .join(" ")}
          </p>
        </a>
      ))}
    </div>
  );
};

export default Feed;
