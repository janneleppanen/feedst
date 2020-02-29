import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import classnames from "classnames";

import { NewFeedModal } from "../NewFeedForm";
import SidebarWrapper from "./SidebarWrapper";

interface Props {
  feeds: FeedList;
  onSyncClick: () => void;
}

const Sidebar = ({ feeds, onSyncClick }: Props) => {
  let match = useRouteMatch<{ id: string }>("/feed/:id");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (feeds.length === 0) {
    return <SidebarWrapper />;
  }

  return (
    <SidebarWrapper>
      <h2 className="text-gray-600 uppercase tracking-wider text-sm mb-4 flex justify-between">
        <span>Feeds</span>
        <button className="hover:text-green-400" onClick={onSyncClick}>
          Sync all
        </button>
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

      <hr className="my-4 border-gray-700" />

      <button
        className="hover:text-green-400"
        onClick={() => setIsModalOpen(true)}
        data-testid="open-new-feed-modal"
      >
        + Add new
      </button>

      <NewFeedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SidebarWrapper>
  );
};

export default Sidebar;
