import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "./index";

const feeds = JSON.parse(localStorage.getItem("feeds") || "[]") as FeedState[];
const persistedState = { feeds };
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(ReduxThunk)
);

store.subscribe(() => {
  const feeds = store.getState().feeds;
  const savedFeeds = feeds.map(feed => ({
    url: feed.url,
    data: undefined,
    status: feed.status
  }));
  localStorage.setItem("feeds", JSON.stringify(savedFeeds));
});

export default store;
