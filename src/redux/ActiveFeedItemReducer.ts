const SET_FEED_ITEM = "activeFeedItem/set";
const REMOVE_FEED_ITEM = "activeFeedItem/remove";

type Action = SetAction | RemoveAction;

type SetAction = {
  type: typeof SET_FEED_ITEM;
  feedItem: FeedItem;
};

type RemoveAction = {
  type: typeof REMOVE_FEED_ITEM;
};

const ActiveFeedItemReducer = (
  state: FeedItem | null = null,
  action: Action
) => {
  switch (action.type) {
    case SET_FEED_ITEM:
      return action.feedItem;
    case REMOVE_FEED_ITEM:
      return null;
  }
  return state;
};

export function setActiveFeedItem(feedItem: FeedItem) {
  return { type: SET_FEED_ITEM as typeof SET_FEED_ITEM, feedItem };
}

export function removeActiveFeedItem() {
  return { type: REMOVE_FEED_ITEM as typeof REMOVE_FEED_ITEM };
}

export default ActiveFeedItemReducer;
