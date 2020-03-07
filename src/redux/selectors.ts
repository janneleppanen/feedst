import * as FromFeedRedux from "./FeedRedux";

export const getFeedItem = (
  state: GlobalState,
  feedItemId: string,
  feedId: string
) => {
  return FromFeedRedux.getFeedItem(state.feeds, feedItemId, feedId);
};
