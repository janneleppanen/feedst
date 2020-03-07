import React from "react";
import { connect } from "react-redux";

import { loadFeed } from "../../redux/FeedRedux";

interface Props {
  loadFeed: (url: string) => void;
}

const NewFeedForm: React.FC<Props> = ({ loadFeed }) => {
  const [newFeedURL, setNewFeedURL] = React.useState<string>("");

  const handleFormSubmit = () => {
    loadFeed(newFeedURL);
    setNewFeedURL("");
  };

  return (
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
      <button className="btn" data-testid="new-feed-submit">
        Add Feed
      </button>
    </form>
  );
};

export default connect(null, { loadFeed })(NewFeedForm);
