import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

interface Props {
  feeds: FeedList;
}

const Sidebar = ({ feeds }: Props) => {
  return (
    <div className="bg-gray-800 w-64 p-6 text-white flex-col">
      <Link
        className="text-green-400 text-lg font-bold tracking-wider mb-10 block flex"
        to="/"
      >
        <div className="w-6 h-6 border-4 border-green-400 rounded-full mr-2"></div>
        RSS Reader
      </Link>

      <h2 className="text-gray-100 uppercase tracking-wider text-sm opacity-50 mb-4">
        Feeds
      </h2>

      {feeds.map((feed, index) => (
        <div key={feed.url} className="mb-2">
          <Link
            to={`/feed/${index}`}
            className="truncate block hover:text-green-400 flex items-center"
          >
            {feed.data?.image ? (
              <img src={feed.data.image.url} alt="" className="w-8 h-8 mr-2" />
            ) : (
              <div className="bg-green-400 w-8 h-8 mr-2 text-gray-800 font-bold flex items-center justify-center">
                <span>{feed.data?.title[0]}</span>
              </div>
            )}
            <div className="truncate block flex-1 text-sm">
              {feed.status === "ready" ? feed.data?.title : "loading..."}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    feeds: state.feeds
  };
};

export default connect(mapStateToProps)(Sidebar);
