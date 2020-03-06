import React from "react";
import { format, formatDistance, isToday } from "date-fns";
import { Link, useLocation } from "react-router-dom";

export interface Props {
  title: string;
  link: string;
  date: string;
  author?: string;
  feedId: string;
  feedItemId: string;
}

const FeedItemLink = ({ title, date, author, feedId, feedItemId }: Props) => {
  const location = useLocation();
  const ago = formatDistance(new Date(), new Date(date));
  const formattedDate = format(new Date(date), "LLLL, d y");
  return (
    <Link
      className="border-solid block text-lg -mx-4 p-4 hover:bg-green-200 block w-full text-left"
      data-testid="feed-item-link"
      to={{
        pathname: `/feed/${feedId}/item/${feedItemId}/`,
        state: { background: location }
      }}
    >
      <p className="text-gray-500 text-md">
        {isToday(new Date(date)) && (
          <span className="bg-green-400 text-white font-bold inline-block px-2 py-1 text-sm rounded-lg mr-2">
            Today
          </span>
        )}
        {ago} ago &bull; {formattedDate}
      </p>
      <h2 data-testid={title} className="font-bold mb-1">
        {title}
      </h2>
      {author && <p className="text-gray-500">{author}</p>}
    </Link>
  );
};

export default FeedItemLink;
