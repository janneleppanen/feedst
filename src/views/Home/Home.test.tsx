import React from "react";

import { render } from "../../utils/test-utils";
import Home from ".";

describe("<Home />", () => {
  test("should show list of feed items", () => {
    const { getAllByTestId } = render(<Home />);
    expect(getAllByTestId("feed-item-link").length).toBe(3);
  });

  test("should filter list of feed item by search term", async () => {
    const { findAllByTestId } = render(<Home />, {
      searchTerm: "Hello World",
    });

    const items = await findAllByTestId("feed-item-link");
    expect(items.length).toBe(1);
  });
});
