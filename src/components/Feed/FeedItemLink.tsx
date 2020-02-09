import React from "react";

import { FeedItem } from "../../App";

interface Props {
  item: FeedItem;
}

const FeedItemLink = ({ item }: Props) => {
  return (
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
  );
};

export default FeedItemLink;
