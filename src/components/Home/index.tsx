import React from "react";
import { connect } from "react-redux";

import FeedItemLink, { Props as FeedItemLinkProps } from "../Feed/FeedItemLink";
import { loadFeed } from "../../redux/FeedReducer";

interface Props {
  feeds: FeedList;
  loadFeed: (url: string) => void;
}

const Home = ({ loadFeed, feeds }: Props) => {
  const [newFeedURL, setNewFeedURL] = React.useState<string>("");
  const allFeedItems: FeedItemLinkProps[] = feeds.reduce(
    (all: FeedItemLinkProps[], feed) => {
      if (!feed.data || !feed.data.items) {
        return all;
      }

      const newItems = feed.data.items.map(i => {
        return {
          title: i.title,
          link: i.link,
          date: i.isoDate,
          author: feed.data?.title
        };
      });
      return [...all, ...newItems];
    },
    []
  );

  const sortedFeedItems = allFeedItems.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate.getTime() > bDate.getTime() ? -1 : 1;
  });

  const handleFormSubmit = () => {
    loadFeed(newFeedURL);
    setNewFeedURL("");
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="flex"
      >
        <input
          className="border border-gray-300 border-solid rounded-md py-2 px-4 mr-2 flex-1"
          type="text"
          value={newFeedURL}
          placeholder="https://the-best-articles.io/feed"
          onChange={e => setNewFeedURL(e.currentTarget.value)}
          data-testid="new-feed-input"
        />
        <button
          className="py-2 px-5 bg-green-600 text-white rounded-md"
          data-testid="new-feed-submit"
        >
          Add RSS
        </button>
      </form>
      <hr className="my-10" />

      {sortedFeedItems.map(item => {
        return (
          <FeedItemLink
            key={item.title}
            title={item.title}
            link={item.link}
            date={item.date}
            author={item.author}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state: GlobalState) => {
  return {
    feeds: state.feeds
  };
};

export default connect(mapStateToProps, { loadFeed })(Home);
