import { Dispatch } from "redux";

const FEED_PARSE_URL = process.env.REACT_APP_FEED_PARSE_URL;

const CREATE_FEED = "feed/create";
const UPDATE_FEED = "feed/update";

type Action = CreateAction | UpdateAction;

type CreateAction = {
  type: typeof CREATE_FEED;
  url: string;
};

type UpdateAction = {
  type: typeof UPDATE_FEED;
  url: string;
  data: Feed;
};

const FeedReducer = (state: FeedList = [], action: Action) => {
  switch (action.type) {
    case CREATE_FEED:
      return [
        ...state,
        {
          url: action.url,
          data: undefined,
          status: "loading"
        } as FeedState
      ];
    case UPDATE_FEED:
      return state.map(feed => {
        if (feed.url === action.url) {
          feed.data = action.data;
          feed.status = "ready";
        }
        return feed;
      });
    default:
      return state;
  }
};

export function createFeed(url: string) {
  return { type: CREATE_FEED, url };
}

export function updateFeed(url: string, data: Feed) {
  return { type: UPDATE_FEED, url, data };
}

export function loadFeed(url: string) {
  return async (dispatch: Dispatch) => {
    dispatch(createFeed(url));

    const res = await fetch(FEED_PARSE_URL || "", {
      method: "POST",
      body: JSON.stringify({ rssFeeds: [url] })
    });
    const data = await res.json();
    const feedData = data[url];

    dispatch(updateFeed(url, feedData));
  };
}

export default FeedReducer;
