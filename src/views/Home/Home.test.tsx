import React from "react";

import { render, fireEvent, act } from "../../utils/test-utils";
import Home from ".";

describe("<Home />", () => {
  test("should show list of feed items", () => {
    const { getAllByTestId } = render(<Home />);
    expect(getAllByTestId("feed-item-link").length).toBe(3);
  });

  test("should filter list of feed item by search term", async () => {
    const { getByTestId, findAllByTestId } = render(<Home />);

    await act(async () => {
      const searchInput = getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "Hello World" } });
    });

    const items = await findAllByTestId("feed-item-link");
    expect(items.length).toBe(1);
  });
});
