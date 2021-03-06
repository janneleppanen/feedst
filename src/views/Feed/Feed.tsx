import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import classnames from "classnames";

import Search from "../../components/Search";
import { removeFeed, loadFeed } from "../../redux/FeedRedux";
import FeedItemLink from "../../components/FeedItemLink";

interface Props {
  feeds: FeedList;
  searchTerm: string;
  removeFeed: (url: string) => void;
  loadFeed: (url: string) => void;
  match: {
    params: {
      feedId: string;
    };
  };
}

const Feed = (props: Props) => {
  const { feeds, removeFeed, loadFeed, searchTerm } = props;
  const feedId = props.match.params.feedId;
  const feed = feeds.find(feed => feed.id === feedId);
  const history = useHistory();

  if (!feed) {
    return <p>Feed not found.</p>;
  }

  if (!feed.items) {
    return <p>Feed not found.</p>;
  }

  const remove = () => {
    removeFeed(feed.url);
    history.push("/");
  };

  const filteredFeedItems = feed.items.filter(feedItem =>
    feedItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Search />

      <hr className="my-8 mx-4" />

      <header className="mb-16 mx-4">
        <h1 className="text-4xl font-bold leading-tight mb-6">{feed.title}</h1>
        <p className="text-xl text-gray-700 mb-6">{feed.description}</p>
        <div className="flex">
          <button
            onClick={() => loadFeed(feed.url)}
            className="text-green-600 text-md"
          >
            Sync
          </button>
          <span className="inline-block px-2 text-gray-700">&bull;</span>
          <a href={feed.link} className="text-green-600 text-md">
            Visit website
          </a>
          <span className="inline-block px-2 text-gray-700">&bull;</span>
          <button className="text-red-400" onClick={remove}>
            Delete feed
          </button>
        </div>
      </header>

      <div className={classnames({ "opacity-25": feed.status === "loading" })}>
        {filteredFeedItems.map(item => (
          <FeedItemLink
            key={`${item.link}`}
            title={item.title}
            link={item.link}
            date={item.isoDate}
            feedId={feedId.toString()}
            feedItemId={item.id}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = ({ feeds, searchTerm }: GlobalState) => {
  return {
    feeds,
    searchTerm
  };
};

export default connect(mapStateToProps, {
  removeFeed,
  loadFeed
})(Feed);
