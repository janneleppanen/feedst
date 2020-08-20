const SET_SEARCH_TERM = "search/set";
const REMOVE_SEARCH_TERM = "seach/remove";

type Action = {
  type: typeof SET_SEARCH_TERM | typeof REMOVE_SEARCH_TERM;
  term: string;
};

const reducer = (state = "", action: Action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.term;
    case REMOVE_SEARCH_TERM:
      return "";
    default:
      return state;
  }
};

const setSearchTerm = (term: string) => ({
  type: SET_SEARCH_TERM as typeof SET_SEARCH_TERM,
  term,
});

const removeSearchTerm = () => ({
  type: REMOVE_SEARCH_TERM as typeof REMOVE_SEARCH_TERM,
  term: "",
});

export { reducer, setSearchTerm, removeSearchTerm };
