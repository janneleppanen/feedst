import React from "react";
import fetch from "node-fetch";
import { store } from "../../redux/store";

import { render, feeds, fireEvent, waitFor, act } from "../../utils/test-utils";
import Sidebar from ".";

jest.mock("node-fetch");

describe("<Sidebar/>", () => {
  test("renders feed items", () => {
    const { getAllByTestId } = render(
      <Sidebar feeds={feeds} onSyncClick={() => {}} />
    );
    expect(getAllByTestId("sidebar-feed-item").length).toBe(3);
  });

  test("show loading state", () => {
    const { getByText } = render(
      <Sidebar feeds={feeds} onSyncClick={() => {}} />
    );
    expect(getByText("loading...")).toBeTruthy();
  });

  test("should add new feed", async () => {
    const { findByTestId } = render(
      <Sidebar feeds={feeds} onSyncClick={() => {}} />
    );
    const openNewFeedModalButton: HTMLElement = await findByTestId(
      "open-new-feed-modal"
    );

    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response("4")));

    // click to open modal
    fireEvent.click(openNewFeedModalButton);

    // wait for modal to open
    const input = await findByTestId("new-feed-input");
    const submit = await findByTestId("new-feed-submit");

    fireEvent.change(input, {
      target: { value: "https://add-a-new-feed.com/rss" },
    });
    fireEvent.click(submit);

    expect(fetch).toHaveBeenCalledTimes(1);
    waitFor(() => {
      expect(store.getState().feeds.length).toBe(4);
    });
  });

  test("should remove feed item if load fails", async () => {
    const { findByTestId } = render(
      <Sidebar feeds={feeds} onSyncClick={() => {}} />
    );
    const openNewFeedModalButton: HTMLElement = await findByTestId(
      "open-new-feed-modal"
    );

    // @ts-ignore
    fetch.mockReturnValue(Promise.reject(new Response("4")));

    // click to open modal
    fireEvent.click(openNewFeedModalButton);

    // wait for modal to open
    const input = await findByTestId("new-feed-input");
    const submit = await findByTestId("new-feed-submit");

    act(() => {
      fireEvent.change(input, {
        target: { value: "https://add-a-new-feed.com/rss" },
      });
      fireEvent.click(submit);
    });

    waitFor(() => {
      expect(store.getState().feeds).toBe(3);
    });
  });
});
