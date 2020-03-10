import React from "react";
import { connect } from "react-redux";

import { loadFeed } from "../../redux/FeedRedux";
import Button from "../common/Button";
import TextInput from "../common/TextInput";

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
      <TextInput
        label="URL of the RSS feed"
        id="new-feed"
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
