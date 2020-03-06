import React from "react";
import { connect } from "react-redux";
import { format } from "date-fns";

interface Props {
  feedItem: FeedItem | null;
  match: {
    params: {
      feedId: string;
      feedItemId: string;
    };
  };
}

const Article: React.FC<Props> = ({ feedItem }) => {
  if (!feedItem) return null;

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

const mapStateToProps = (state: GlobalState, props: Props) => {
  const { feedId, feedItemId } = props.match.params;
  const feed = state.feeds[parseInt(feedId)];
  let feedItem = feed?.data?.items[parseInt(feedItemId)];

  return {
    feedItem: feedItem || null
  };
};

export default connect(mapStateToProps)(Article);
