import React from "react";
import { connect } from "react-redux";

import FeedItemLink, {
  Props as FeedItemLinkProps
} from "../../components/FeedItemLink/FeedItemLink";

interface Props {
  feeds: FeedList;
}

const Home = ({ feeds }: Props) => {
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

  return (
    <>
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

export default connect(mapStateToProps)(Home);
