import { reducer, createFeed, updateFeed, removeFeed } from "./FeedRedux";

describe("FeedReducer", () => {
  test("should create a new feed", () => {
    const url = "https://feed.url";
    const expectedState: FeedState[] = [
      {
        id: "1234",
        data: undefined,
        status: "loading",
        url
      }
    ];
    const state = reducer([], createFeed(url));

    expect(state.length).toEqual(1);
    expect(state[0]?.data).toEqual(expectedState[0].data);
    expect(state[0]?.status).toEqual(expectedState[0].status);
    expect(state[0]?.url).toEqual(expectedState[0].url);
    expect(typeof state[0]?.id).toEqual("string");
  });

  test("should update a feed data and change status", () => {
    const id = "1234";
    const url = "https://feed.url";
    const initialState: FeedState[] = [
      { id, url, status: "loading", data: undefined }
    ];
    const data = {
      title: "Title",
      description: "Description",
      image: undefined,
      link: "...",
      items: []
    };
    const expectedState: FeedState[] = [{ id, url, status: "ready", data }];
    const state = reducer(initialState, updateFeed("https://feed.url", data));

    expect(state).toEqual(expectedState);
  });

  test("should remove a feed", () => {
    const url = "https://feed.url";
    const initialState: FeedState[] = [
      { id: "1234", url, status: "loading", data: undefined }
    ];
    const state = reducer(initialState, removeFeed(url));

    expect(state).toEqual([]);
  });
});
