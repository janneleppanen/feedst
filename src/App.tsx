import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { loadFeed } from "./redux/FeedReducer";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Feed from "./views/Feed";

interface Props {
  feeds: FeedState[];
  loadFeed: (url: string) => void;
}

const App = ({ feeds, loadFeed }: Props) => {
  const syncAllFeeds = () => {
    feeds.forEach(feed => loadFeed(feed.url));
  };

  return (
    <div className="flex h-screen text-sm font-sans">
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
    feeds: state.feeds
  };
};

export default connect(mapStateToProps, { loadFeed })(App);
