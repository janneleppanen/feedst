import React from "react";
import { connect } from "react-redux";

import Search from "../../components/Search";
import FeedItemLink, {
  Props as FeedItemLinkProps
} from "../../components/FeedItemLink/FeedItemLink";
import EmtpyState from "../../components/EmptyState";

interface Props {
  feeds: FeedList;
  searchTerm: string;
}

const Home = ({ feeds, searchTerm }: Props) => {
  let allFeedItems: FeedItemLinkProps[] = feeds.reduce(
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

  allFeedItems = allFeedItems.filter(feedItem => {
    return feedItem.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedFeedItems = allFeedItems.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return aDate.getTime() > bDate.getTime() ? -1 : 1;
  });

  if (feeds.length === 0) {
    return <EmtpyState />;
  }

  return (
    <>
      <Search />

      <hr className="my-8" />

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

const mapStateToProps = ({ feeds, searchTerm }: GlobalState) => {
  return {
    feeds,
    searchTerm
  };
};

export default connect(mapStateToProps)(Home);
