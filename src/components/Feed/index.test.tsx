import React from "react";
import { render } from "../../utils/test-utils";

import Feed from ".";

describe("<Feed />", () => {
  test("should render feed list", () => {
    const { getAllByTestId } = render(
      <Feed match={{ params: { feedId: "0" } }} />
    );

    const feedItemLink = getAllByTestId("feed-item-link");
    expect(feedItemLink.length).toBe(2);
  });
});
