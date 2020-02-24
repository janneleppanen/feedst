import React from "react";

import { render } from "../../utils/test-utils";
import Home from ".";

describe("<Home />", () => {
  test("should show list of feed items", () => {
    const { getAllByTestId } = render(<Home />);
    expect(getAllByTestId("feed-item-link").length).toBe(3);
  });
});
