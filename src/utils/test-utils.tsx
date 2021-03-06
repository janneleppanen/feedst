import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../redux/store";
import { render, RenderOptions } from "@testing-library/react";

const feeds: FeedList = [
  {
    id: "abc-123",
    url: "http://podcast.tech/rss",
    status: "ready",
    title: "Podcast",
    description: "Podcast description...",
    image: undefined,
    link: "http://podcast.tech",
    items: [
      {
        id: "abc-123-1",
        title: "1. Intro",
        contentSnippet: "Snippet...",
        content: "Content...",
        link: "http://podcast.tech/1",
        pubDate: "Mon, 3 Feb 2020 15:42:36 +0000",
        isoDate: "2020-02-03T15:42:36.000Z",
      },
      {
        id: "abc-123-2",
        title: "2. Intro",
        contentSnippet: "Snippet...",
        content: "Content...",
        link: "http://podcast.tech/2",
        pubDate: "Mon, 2 Feb 2020 15:42:36 +0000",
        isoDate: "2020-02-03T15:42:36.000Z",
      },
    ],
  },
  {
    id: "jkl-123",
    url: "http://another-podcast.tech/rss",
    status: "ready",
    title: "Podcast",
    description: "Podcast description...",
    image: {
      url: "http://another-podcast.tech/assests/image",
    },
    link: "http://another-podcast.tech",
    items: [
      {
        id: "jkl-123-1",
        title: "2. Hello World",
        contentSnippet: "Snippet...",
        content: "Content...",
        link: "http://another-podcast.tech/1",
        pubDate: "Mon, 17 Feb 2020 15:42:36 +0000",
        isoDate: "2020-02-17T15:42:36.000Z",
      },
    ],
  },
  {
    id: "str-123",
    url: "http://magazine.tech/rss",
    status: "loading",
    items: [],
  },
];

const customRender = (
  ui: React.ReactElement,
  initialState?: {},
  options?: Omit<RenderOptions, "queries">
) => {
  // @ts-ignore
  store.replaceReducer(() => ({ feeds, searchTerm: "", ...initialState }));

  const AllProviders: React.FC = ({ children }) => {
    return (
      <>
        <Provider store={store}>
          <Router>{children}</Router>
        </Provider>
        <div id="modal-root"></div>
      </>
    );
  };

  return render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react";

export { customRender as render, feeds };
