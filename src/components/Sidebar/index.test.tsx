import React from "react";

import { render, feeds } from "../../utils/test-utils";
import Sidebar from ".";

describe("<Sidebar/>", () => {
  test("renders feed items", () => {
    const { getAllByTestId } = render(<Sidebar feeds={feeds} />);
    expect(getAllByTestId("sidebar-feed-item").length).toBe(3);
  });

  test("show loading state", () => {
    const { getByText } = render(<Sidebar feeds={feeds} />);
    expect(getByText("loading...")).toBeTruthy();
  });
});
