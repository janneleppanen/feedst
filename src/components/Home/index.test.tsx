import React from "react";
import fetch from "node-fetch";
import { store } from "../../redux/store";

import { render, fireEvent, wait } from "../../utils/test-utils";
import Home from ".";

jest.mock("node-fetch");

describe("<Home />", () => {
  test("should show list of feed items", () => {
    const { getAllByTestId } = render(<Home />);
    expect(getAllByTestId("feed-item-link").length).toBe(2);
  });

  test("should add new feed", () => {
    const { getByTestId } = render(<Home />);
    const input: HTMLElement = getByTestId("new-feed-input");
    const submit: HTMLElement = getByTestId("new-feed-submit");

    // @ts-ignore
    fetch.mockReturnValue(Promise.resolve(new Response("4")));

    fireEvent.change(input, {
      target: { value: "https://add-a-new-feed.com/rss" }
    });
    fireEvent.click(submit);

    expect(fetch).toHaveBeenCalledTimes(1);
    wait(() => {
      expect(store.getState().feeds.length).toBe(4);
    });
  });
});
