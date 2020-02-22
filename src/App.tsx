import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { loadFeed } from "./redux/FeedReducer";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Feed from "./components/Feed/Feed";

interface Props {
  feeds: FeedState[];
  loadFeed: (url: string) => void;
}

const App = ({ feeds }: Props) => {
  return (
    <div className="flex h-screen text-sm font-sans">
      <Sidebar feeds={feeds} />
      <main className="flex flex-1 flex-col overflow-auto h-full">
        <div className="max-w-screen-md w-full mx-auto my-10 p-10">
          <Switch>
            <Route path="/feed/:feedId" component={Feed}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    feeds: state.feeds
  };
};

export default connect(mapStateToProps, { loadFeed })(App);
