import React from "react";
import { format, formatDistance } from "date-fns";

export interface Props {
  title: string;
  link: string;
  date: string;
  author?: string;
}

const FeedItemLink = ({ title, link, date, author }: Props) => {
  const ago = formatDistance(new Date(), new Date(date));
  const formattedDate = format(new Date(date), "LLLL, d y");
  return (
    <a
      key={title}
      href={link}
      className="border-solid block text-lg -mx-4 p-4 hover:bg-green-200"
      data-testid="feed-item-link"
    >
      <p className="text-gray-500 text-md">
        {ago} ago &bull; {formattedDate}
      </p>
      <h2 data-testid={title} className="font-bold mb-1">
        {title}
      </h2>
      {author && <p className="text-gray-500">{author}</p>}
    </a>
  );
};

export default FeedItemLink;
