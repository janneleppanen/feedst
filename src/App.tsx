import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { loadFeed } from "./redux/FeedReducer";
import { removeActiveFeedItem } from "./redux/ActiveFeedItemReducer";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Feed from "./views/Feed";
import FeedItemArticle from "./components/FeedItemArticle";
import SlideContent from "./components/SlideContent";

interface Props {
  feeds: FeedState[];
  article: FeedItem | null;
  loadFeed: (url: string) => void;
  removeActiveFeedItem: () => void;
}

const App = ({ feeds, article, loadFeed, removeActiveFeedItem }: Props) => {
  const syncAllFeeds = () => {
    feeds.forEach(feed => loadFeed(feed.url));
  };

  return (
    <div className="flex h-screen text-sm font-sans">
      <SlideContent onClose={() => removeActiveFeedItem()} isOpen={!!article}>
        {article && <FeedItemArticle feedItem={article} />}
      </SlideContent>

      <Sidebar feeds={feeds} onSyncClick={syncAllFeeds} />
      <div className="flex flex-1 flex-col overflow-auto h-full">
        <main className="max-w-screen-md w-full mx-auto my-10 p-10 flex-1">
          <Switch>
            <Route path="/feed/:feedId" component={Feed}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    feeds: state.feeds,
    article: state.activeFeedItem
  };
};

export default connect(mapStateToProps, { loadFeed, removeActiveFeedItem })(
  App
);
