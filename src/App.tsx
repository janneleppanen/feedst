import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { loadFeed } from "./redux/FeedRedux";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Feed from "./views/Feed";
import FeedItemArticle from "./components/FeedItemArticle";
import SlideContent from "./components/SlideContent";

interface Props {
  feeds: FeedState[];
  loadFeed: (url: string) => void;
}

const App = ({ feeds, loadFeed }: Props) => {
  const location = useLocation();
  const history = useHistory();

  // @ts-ignore
  const background = location.state && location.state.background;

  const syncAllFeeds = () => {
    feeds.forEach(feed => loadFeed(feed.url));
  };

  return (
    <div className="flex h-screen text-sm font-sans">
      <SlideContent
        onClose={() => history.push(background?.pathname || "/")}
        isOpen={!!background}
      >
        <Route
          path="/feed/:feedId/item/:feedItemId"
          component={FeedItemArticle}
        />
      </SlideContent>

      <Sidebar feeds={feeds} onSyncClick={syncAllFeeds} />
      <div className="flex flex-1 flex-col overflow-auto h-full">
        <main className="max-w-screen-md w-full mx-auto my-10 p-10 flex-1">
          <Switch location={background || location}>
            <Route exact path="/" component={Home}></Route>
            <Route path="/feed/:feedId" component={Feed}></Route>
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
