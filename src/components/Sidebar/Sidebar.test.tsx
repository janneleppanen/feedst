import React from "react";
import fetch from "node-fetch";
import { store } from "../../redux/store";

import {
  render,
  feeds,
  fireEvent,
  wait,
  waitForElement
} from "../../utils/test-utils";
import Sidebar from ".";

jest.mock("node-fetch");

describe("<Sidebar/>", () => {
  test("renders feed items", () => {
    const { getAllByTestId } = render(<Sidebar feeds={feeds} />);
    expect(getAllByTestId("sidebar-feed-item").length).toBe(3);
  });

  test("show loading state", () => {
    const { getByText } = render(<Sidebar feeds={feeds} />);
    expect(getByText("loading...")).toBeTruthy();
  });

  test("should add new feed", async () => {
    const { getByTestId, container } = render(<Sidebar feeds={feeds} />);
    const openNewFeedModalButton: HTMLElement = getByTestId(
      "open-new-feed-modal"
    );

    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response("4")));

    // click to open modal
    fireEvent.click(openNewFeedModalButton);

    // wait for modal to open
    const [input, submit] = await waitForElement(
      () => [getByTestId("new-feed-input"), getByTestId("new-feed-submit")],
      { container }
    );
    fireEvent.change(input, {
      target: { value: "https://add-a-new-feed.com/rss" }
    });
    fireEvent.click(submit);

    expect(fetch).toHaveBeenCalledTimes(1);
    wait(() => {
      expect(store.getState().feeds.length).toBe(4);
    });
  });

  test("should remove feed item if load fails", async () => {
    const { getByTestId, container } = render(<Sidebar feeds={feeds} />);
    const openNewFeedModalButton: HTMLElement = getByTestId(
      "open-new-feed-modal"
    );

    // @ts-ignore
    fetch.mockReturnValue(Promise.reject(new Response("4")));

    // click to open modal
    fireEvent.click(openNewFeedModalButton);

    // wait for modal to open
    const [input, submit] = await waitForElement(
      () => [getByTestId("new-feed-input"), getByTestId("new-feed-submit")],
      { container }
    );

    fireEvent.change(input, {
      target: { value: "https://add-a-new-feed.com/rss" }
    });
    fireEvent.click(submit);

    wait(() => {
      expect(store.getState().feeds.length).toBe(3);
    });
  });
});
