import React from "react";
import { Switch, Route } from "react-router-dom";

import { useFeeds } from "./components/Feed/FeedContext";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Feed from "./components/Feed";

export interface Feed {
  title: string;
  image?: {
    url: string;
  };
  items: FeedItem[];
}

export interface FeedItem {
  title: string;
  link: string;
  content: string;
}

export type FeedList = Feed[];

const App = () => {
  const { feeds, addFeed } = useFeeds();

  return (
    <div className="h-screen flex">
      <Sidebar feeds={feeds} />
      <main className="flex-1">
        <div className="max-w-screen-lg mx-auto my-10 p-10">
          <Switch>
            <Route path="/feed/:feedId">
              <Feed />
            </Route>
            <Route path="/">
              <Home feeds={feeds} addFeed={addFeed} />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default App;
