import * as FromFeedRedux from "./FeedRedux";

export const getFeedItem = (
  state: GlobalState,
  feedItemId: number,
  feedId: number
) => {
  return FromFeedRedux.getFeedItem(state.feeds, feedItemId, feedId);
};
