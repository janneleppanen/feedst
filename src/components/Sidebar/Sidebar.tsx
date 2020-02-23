import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import classnames from "classnames";

interface Props {
  feeds: FeedList;
}

const Sidebar = ({ feeds }: Props) => {
  let match = useRouteMatch<{ id: string }>("/feed/:id");

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
        <div key={feed.url}>
          <Link
            to={`/feed/${index}`}
            className={classnames(
              "truncate block hover:text-green-400 hover:bg-gray-900 flex items-center border-r-8 border-solid border-transparent -mx-6 px-6 py-2",
              { "border-green-400": parseInt(match?.params.id || "") === index }
            )}
            data-testid="sidebar-feed-item"
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

export default Sidebar;
