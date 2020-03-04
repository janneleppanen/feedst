import { combineReducers } from "redux";

import FeedReducer from "./FeedReducer";
import SearchReducer from "./SearchReducer";
import ActiveFeedItemReducer from "./ActiveFeedItemReducer";

export default combineReducers({
  feeds: FeedReducer,
  searchTerm: SearchReducer,
  activeFeedItem: ActiveFeedItemReducer
});
