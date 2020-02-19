import React from "react";
import { render } from "../../utils/test-utils";
import Sidebar from ".";

const feeds: FeedList = [
  {
    url: "http://podcast.tech/rss",
    status: "ready",
    data: {
      title: "Podcast",
      description: "Podcast description...",
      image: undefined,
      link: "http://podcast.tech",
      items: [
        {
          title: "1. Intro",
          contentSnippet: "Snippet...",
          content: "Content...",
          link: "http://podcast.tech/1",
          pubDate: "01-01-2020",
          isoDate: "01-01-2020"
        }
      ]
    }
  },
  {
    url: "http://another-podcast.tech/rss",
    status: "ready",
    data: {
      title: "Podcast",
      description: "Podcast description...",
      image: {
        url: "http://another-podcast.tech/assests/image"
      },
      link: "http://another-podcast.tech",
      items: [
        {
          title: "1. Intro",
          contentSnippet: "Snippet...",
          content: "Content...",
          link: "http://another-podcast.tech/1",
          pubDate: "01-01-2020",
          isoDate: "01-01-2020"
        }
      ]
    }
  },
  {
    url: "http://magazine.tech/rss",
    status: "loading",
    data: undefined
  }
];

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
