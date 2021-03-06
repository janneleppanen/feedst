import { reducer, createFeed, updateFeed, removeFeed } from "./FeedRedux";

describe("FeedReducer", () => {
  test("should create a new feed", () => {
    const url = "https://feed.url";
    const expectedState: FeedList = [
      {
        id: "1234",
        status: "loading",
        url,
        items: []
      }
    ];
    const state = reducer([], createFeed(url));

    expect(state.length).toEqual(1);
    expect(state[0]?.status).toEqual(expectedState[0].status);
    expect(state[0]?.url).toEqual(expectedState[0].url);
  });

  test("should update a feed data and change status", () => {
    const id = "1234";
    const url = "https://feed.url";
    const initialState: FeedList = [{ id, url, status: "loading", items: [] }];
    const data = {
      title: "Title",
      description: "Description",
      image: undefined,
      link: "...",
      items: []
    };
    const expectedState: FeedList = [{ id, url, status: "ready", ...data }];
    const state = reducer(initialState, updateFeed("https://feed.url", data));

    expect(state).toEqual(expectedState);
  });

  test("should remove a feed", () => {
    const url = "https://feed.url";
    const initialState: FeedList = [
      { id: "1234", url, status: "loading", items: [] }
    ];
    const state = reducer(initialState, removeFeed(url));

    expect(state).toEqual([]);
  });
});
