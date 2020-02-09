import React from "react";
import { Switch, Route } from "react-router-dom";

import { useFeeds } from "./components/Feed/FeedContext";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Feed from "./components/Feed/Feed";

export interface Feed {
  title: string;
  description: string;
  image?: {
    url: string;
  };
  link: string;
  items: FeedItem[];
}

export interface FeedItem {
  title: string;
  contentSnippet: string;
  content: string;
  link: string;
  pubDate: string;
  isoDate: string;
}

export type FeedList = Feed[];

const App = () => {
  const { feeds, addFeed } = useFeeds();

  return (
    <div className="flex h-screen text-sm font-sans">
      <Sidebar feeds={feeds} />
      <main className="flex flex-1 flex-col overflow-auto h-full">
        <div className="max-w-screen-md mx-auto my-10 p-10">
          <Switch>
            <Route path="/feed/:feedId" component={Feed}></Route>
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
