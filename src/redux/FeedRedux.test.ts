import { reducer, createFeed, updateFeed, removeFeed } from "./FeedRedux";

describe("FeedReducer", () => {
  test("should create a new feed", () => {
    const url = "https://feed.url";
    const expectedState: FeedState[] = [
      {
        data: undefined,
        status: "loading",
        url
      }
    ];
    const state = reducer([], createFeed(url));

    expect(state).toEqual(expectedState);
  });

  test("should update a feed data and change status", () => {
    const url = "https://feed.url";
    const initialState: FeedState[] = [
      { url, status: "loading", data: undefined }
    ];
    const data = {
      title: "Title",
      description: "Description",
      image: undefined,
      link: "...",
      items: []
    };
    const expectedState: FeedState[] = [{ url, status: "ready", data }];
    const state = reducer(initialState, updateFeed("https://feed.url", data));

    expect(state).toEqual(expectedState);
  });

  test("should remove a feed", () => {
    const url = "https://feed.url";
    const initialState: FeedState[] = [
      { url, status: "loading", data: undefined }
    ];
    const state = reducer(initialState, removeFeed(url));

    expect(state).toEqual([]);
  });
});
