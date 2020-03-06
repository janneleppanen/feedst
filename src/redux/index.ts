import { combineReducers } from "redux";

import FeedReducer from "./FeedReducer";
import SearchReducer from "./SearchReducer";

export default combineReducers({
  feeds: FeedReducer,
  searchTerm: SearchReducer
});
