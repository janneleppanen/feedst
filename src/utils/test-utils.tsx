import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "../redux/store";
import { render, RenderOptions } from "@testing-library/react";

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
          pubDate: "Mon, 3 Feb 2020 15:42:36 +0000",
          isoDate: "2020-02-03T15:42:36.000Z"
        },
        {
          title: "2. Intro",
          contentSnippet: "Snippet...",
          content: "Content...",
          link: "http://podcast.tech/2",
          pubDate: "Mon, 2 Feb 2020 15:42:36 +0000",
          isoDate: "2020-02-03T15:42:36.000Z"
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
          title: "2. Hello World",
          contentSnippet: "Snippet...",
          content: "Content...",
          link: "http://another-podcast.tech/1",
          pubDate: "Mon, 17 Feb 2020 15:42:36 +0000",
          isoDate: "2020-02-17T15:42:36.000Z"
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

const AllProviders: React.FC = ({ children }) => {
  // @ts-ignore
  store.replaceReducer(() => ({ feeds }));

  return (
    <>
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
      <div id="modal-root"></div>
    </>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";

export { customRender as render, feeds };
