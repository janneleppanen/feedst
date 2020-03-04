import React from "react";
import { format } from "date-fns";

interface Props {
  feedItem: FeedItem;
}

const Article: React.FC<Props> = ({ feedItem }) => {
  const formattedDate = format(new Date(feedItem.isoDate), "LLLL, d y");
  const content: string = feedItem["content:encoded"] || feedItem.content || "";

  return (
    <div>
      <h1 className="text-4xl font-bold leading-tight mb-6">
        {feedItem.title}
      </h1>

      <p className="mb-6">
        {formattedDate}
        <span className="inline-block px-2 text-gray-700">&bull;</span>
        <a href={feedItem.link} className="text-green-600 text-md">
          Visit website
        </a>
      </p>

      <div
        className="single-content"
        dangerouslySetInnerHTML={{
          __html: content
        }}
      ></div>
    </div>
  );
};

export default Article;
