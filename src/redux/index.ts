import { combineReducers } from "redux";

import { reducer as feeds } from "./FeedRedux";
import { reducer as searchTerm } from "./SearchRedux";

export default combineReducers({
  feeds,
  searchTerm
});
