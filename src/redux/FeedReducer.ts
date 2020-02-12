import { Dispatch } from "redux";

const FEED_PARSE_URL = process.env.REACT_APP_FEED_PARSE_URL;

const CREATE_FEED = "feed/create";
const UPDATE_FEED = "feed/update";
const REMOVE_FEED = "feed/remove";

type Action = CreateAction | UpdateAction | RemoveAction;

type CreateAction = {
  type: typeof CREATE_FEED;
  url: string;
};

type UpdateAction = {
  type: typeof UPDATE_FEED;
  url: string;
  data: Feed;
};

type RemoveAction = {
  type: typeof REMOVE_FEED;
  url: string;
};

const FeedReducer = (state: FeedList = [], action: Action) => {
  switch (action.type) {
    case CREATE_FEED:
      const alreadyExists = state.find(f => f.url === action.url);
      if (alreadyExists) {
        return state.map(feed => {
          return {
            ...feed,
            status: feed.url === action.url ? "loading" : feed.status
          };
        });
      }
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
    case REMOVE_FEED:
      return state.filter(feed => feed.url !== action.url);
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

export function removeFeed(url: string) {
  return { type: REMOVE_FEED, url };
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
