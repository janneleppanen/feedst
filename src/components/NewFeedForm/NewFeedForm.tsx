import React from "react";
import { connect } from "react-redux";

import { loadFeed } from "../../redux/FeedRedux";
import Button from "../common/Button";

interface Props {
  loadFeed: (url: string) => void;
  onSubmit?: () => void;
}

const NewFeedForm: React.FC<Props> = ({ loadFeed, onSubmit }) => {
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
        onSubmit && onSubmit();
      }}
      className="flex"
    >
      <label htmlFor="new-feed" className="sr-only">
        Name of the new feed
      </label>
      <input
        id="new-feed"
        className="border border-gray-300 border-solid rounded-md py-2 px-4 mr-2 flex-1"
        type="text"
        value={newFeedURL}
        placeholder="https://the-best-articles.io/feed"
        onChange={e => setNewFeedURL(e.currentTarget.value)}
        data-testid="new-feed-input"
      />
      <Button data-testid="new-feed-submit">Add Feed</Button>
    </form>
  );
};

export default connect(null, { loadFeed })(NewFeedForm);
