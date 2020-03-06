import React from "react";

import { render } from "../../utils/test-utils";
import FeedItemLink from ".";

test("renders a feed link", () => {
  const title = "Hello World";

  const { queryByTestId } = render(
    <FeedItemLink
      title={title}
      link="https://test.com"
      date="0"
      author="John Doe"
      feedId="1"
      feedItemId="2"
    />
  );

  expect(queryByTestId(title)).toBeTruthy();
});
