import React from "react";
import { connect } from "react-redux";

import FeedItemLink from "../../components/FeedItemLink";
import demoFeeds from "../../utils/demo-feeds";
import Search from "../../components/Search";
import EmtpyState from "../../components/EmptyState";
import { loadFeed } from "../../redux/FeedReducer";

interface Props {
  feeds: FeedList;
  searchTerm: string;
  loadFeed: (url: string) => void;
}

interface FeedItemWithAuthor extends FeedItem {
  author: string;
  id: string;
  feedId: string;
}

const Home = ({ feeds, searchTerm, loadFeed }: Props) => {
  let allFeedItems: FeedItemWithAuthor[] = feeds.reduce(
    (all: FeedItemWithAuthor[], feed, feedId) => {
      if (!feed.data || !feed.data.items) {
        return all;
      }

      const newItems = feed.data.items.map((item, id) => {
        return {
          ...item,
          author: feed.data?.title || "",
          id: id.toString(),
          feedId: feedId.toString()
        };
      });
      return [...all, ...newItems];
    },
    []
  );

  allFeedItems = allFeedItems.filter(feedItem => {
    return feedItem.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedFeedItems = allFeedItems.sort((a, b) => {
    const aDate = new Date(a.isoDate);
    const bDate = new Date(b.isoDate);
    return aDate.getTime() > bDate.getTime() ? -1 : 1;
  });

  const addDemoFeeds = () => demoFeeds.forEach(url => loadFeed(url));

  if (feeds.length === 0) {
    return <EmtpyState onDemoButtonClick={addDemoFeeds} />;
  }

  return (
    <>
      <Search />

      <hr className="my-8" />

      {sortedFeedItems.map(item => {
        return (
          <FeedItemLink
            key={`${item.link}`}
            title={item.title}
            link={item.link}
            date={item.isoDate}
            author={item.author}
            feedId={item.feedId?.toString() || ""}
            feedItemId={item.id?.toString() || ""}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = ({ feeds, searchTerm }: GlobalState) => {
  return {
    feeds,
    searchTerm
  };
};

export default connect(mapStateToProps, { loadFeed })(Home);
