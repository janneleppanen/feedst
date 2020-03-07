import React from "react";
import { render, feeds } from "../../utils/test-utils";

import Feed from ".";

describe("<Feed />", () => {
  test("should render feed list", () => {
    const { getAllByTestId } = render(
      <Feed match={{ params: { feedId: feeds[0].id } }} />
    );

    const feedItemLink = getAllByTestId("feed-item-link");
    expect(feedItemLink.length).toBe(2);
  });
});
