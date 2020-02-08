import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
  const [feeds, setFeeds] = React.useState<FeedList>(
    JSON.parse(localStorage.getItem("feeds") || "") || []
  );

  React.useEffect(() => {
    localStorage.setItem("feeds", JSON.stringify(feeds));
    return () => {};
  }, [feeds]);

  return (
    <Router>
      <div className="h-screen flex">
        <Sidebar feeds={feeds} />
        <main className="flex-1">
          <div className="max-w-screen-lg mx-auto my-10 p-10">
            <Switch>
              <Route path="/feed/:feedId">
                <Feed />
              </Route>
              <Route path="/">
                <Home feeds={feeds} setFeeds={setFeeds} />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
