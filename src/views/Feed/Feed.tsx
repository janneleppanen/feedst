import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { removeFeed } from "../../redux/FeedReducer";
import FeedItemLink from "../../components/FeedItemLink";

interface Props {
  feeds: FeedList;
  removeFeed: (url: string) => void;
  match: {
    params: {
      feedId: string;
    };
  };
}

const Feed = (props: Props) => {
  const { feeds, removeFeed } = props;
  const feedId = parseInt(props.match.params.feedId);
  const feed = feeds[feedId] ? feeds[feedId] : null;
  const history = useHistory();

  if (!feed) {
    return <p>Feed not found.</p>;
  }

  if (feed.status === "loading") {
    return <p>Loading feed data...</p>;
  }

  if (!feed.data) {
    return <p>Feed not found.</p>;
  }

  const remove = () => {
    removeFeed(feed.url);
    history.push("/");
  };

  return (
    <>
      <header className="mb-16">
        <h1 className="text-4xl font-bold leading-tight mb-6">
          {feed.data.title}
        </h1>
        <p className="text-xl text-gray-700 mb-6">{feed.data.description}</p>
        <div className="flex">
          <a href={feed.data.link} className="text-green-600 text-md">
            Visit website
          </a>
          <span className="inline-block px-2 text-gray-700">&bull;</span>
          <button className="text-red-400" onClick={remove}>
            Delete feed
          </button>
        </div>
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

export default connect(mapStateToProps, { removeFeed })(Feed);
