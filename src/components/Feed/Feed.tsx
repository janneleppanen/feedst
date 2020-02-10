import React from "react";
import { connect } from "react-redux";

import FeedItemLink from "./FeedItemLink";

interface Props {
  feeds: FeedList;
  match: {
    params: {
      feedId: string;
    };
  };
}

const Feed = (props: Props) => {
  const { feeds } = props;
  const feedId = parseInt(props.match.params.feedId);
  const feed = feeds[feedId] ? feeds[feedId] : null;

  if (!feed) {
    return <p>Feed not found.</p>;
  }

  if (!feed.data) {
    return <p>Feed not found.</p>;
  }

  return (
    <>
      <header className="mb-16">
        <h1 className="text-4xl font-bold leading-tight mb-6">
          {feed.data.title}
        </h1>
        <p className="text-xl text-gray-700 mb-6">{feed.data.description}</p>
        <a href={feed.data.link} className="text-green-600 text-md">
          Visit website &rarr;
        </a>
      </header>

      {feed.data.items.map(item => (
        <FeedItemLink
          key={item.title}
          title={item.title}
          link={item.link}
          date={item.isoDate}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    feeds: state.feeds
  };
};

export default connect(mapStateToProps)(Feed);
