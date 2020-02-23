import React from "react";
import { render } from "@testing-library/react";
import FeedItemLink from ".";

test("renders feed link", () => {
  const title = "Hello World";

  const { queryByTestId } = render(
    <FeedItemLink
      title={title}
      link="https://test.com"
      date="0"
      author="John Doe"
    />
  );

  expect(queryByTestId(title)).toBeTruthy();
});
