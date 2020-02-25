import React from "react";

import { render, fireEvent, wait } from "../../utils/test-utils";
import Home from ".";

describe("<Home />", () => {
  test("should show list of feed items", () => {
    const { getAllByTestId } = render(<Home />);
    expect(getAllByTestId("feed-item-link").length).toBe(3);
  });

  test("should filter list of feed item by search term", () => {
    const { getAllByTestId, getByTestId } = render(<Home />);
    const searchInput = getByTestId("search-input");

    fireEvent.change(searchInput, { e: { target: { value: "Hello World" } } });

    wait(() => {
      expect(getAllByTestId("feed-item-link").length).toBe(1);
    });
  });
});
