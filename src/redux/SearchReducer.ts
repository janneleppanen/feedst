const SET_SEARCH_TERM = "search/set";
const REMOVE_SEARCH_TERM = "seach/remove";

type Action = {
  type: typeof SET_SEARCH_TERM | typeof REMOVE_SEARCH_TERM;
  term: string;
};

const SearchReducer = (state = "", action: Action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.term;
    case REMOVE_SEARCH_TERM:
      return "";
  }
  return state;
};

export function setSearchTerm(term: string) {
  return { type: SET_SEARCH_TERM as typeof SET_SEARCH_TERM, term };
}

export function removeSearchTerm() {
  return { type: REMOVE_SEARCH_TERM as typeof REMOVE_SEARCH_TERM, term: "" };
}

export default SearchReducer;
