import React from "react";

import { render } from "../../utils/test-utils";
import SlideContent from "../SlideContent";
import FeedItemArticle from ".";

describe("<FeedItemArticle>", () => {
  test("should open slide menu show article content", () => {
    const { findByText } = render(
      <SlideContent onClose={() => {}} isOpen={true}>
        <FeedItemArticle
          match={{ params: { feedId: "abc-123", feedItemId: "abc-123-2" } }}
        />
      </SlideContent>
    );

    expect(findByText("2. Intro")).toBeTruthy();
  });
});
