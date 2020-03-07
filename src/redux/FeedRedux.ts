import { Dispatch } from "redux";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

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
  data: FeedData;
};

type RemoveAction = {
  type: typeof REMOVE_FEED;
  url: string;
};

const feed = (state: undefined, action: Action) => {
  switch (action.type) {
    case CREATE_FEED:
      const id = uuidv4();
      return {
        id,
        url: action.url,
        data: undefined,
        status: "loading"
      } as Feed;
  }
};

const reducer = (state: FeedList = [], action: Action) => {
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
      return [...state, feed(undefined, action)];
    case UPDATE_FEED:
      return state.map(feed => {
        if (feed.url === action.url) {
          feed.data = action.data;
          feed.status = "ready";
        }

        if (feed.data && feed.data.items) {
          feed.data.items = feed.data.items.map(feedItem => {
            const id = uuidv4();
            return {
              ...feedItem,
              id
            };
          });
        }

        return feed;
      });
    case REMOVE_FEED:
      return state.filter(feed => feed.url !== action.url);
    default:
      return state;
  }
};

const createFeed = (url: string) => ({
  type: CREATE_FEED as typeof CREATE_FEED,
  url
});

const updateFeed = (url: string, data: FeedData) => ({
  type: UPDATE_FEED as typeof UPDATE_FEED,
  url,
  data
});

const removeFeed = (url: string) => ({
  type: REMOVE_FEED as typeof REMOVE_FEED,
  url
});

const loadFeed = (url: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createFeed(url));
    try {
      const res = await fetch(FEED_PARSE_URL || "", {
        method: "POST",
        body: JSON.stringify({ rssFeeds: [url] })
      });
      const data = await res.json();
      const feedData = data[url];

      dispatch(updateFeed(url, feedData));
    } catch (e) {
      dispatch(removeFeed(url));
    }
  };
};

const getFeedItem = (
  state: FeedList = [],
  feedItemId: string,
  feedId: string
) => {
  const feed = state.find(feed => feed.id === feedId);
  return feed?.data?.items.find(feedItem => feedItem.id === feedItemId);
};

export { reducer, createFeed, updateFeed, removeFeed, loadFeed, getFeedItem };
