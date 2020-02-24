import React from "react";
import { connect } from "react-redux";

import Modal from "../../common/Modal";
import { loadFeed } from "../../../redux/FeedReducer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  loadFeed: (url: string) => void;
}

const NewFeedModal: React.FC<Props> = ({ isOpen, onClose, loadFeed }) => {
  const [newFeedURL, setNewFeedURL] = React.useState<string>("");

  const handleFormSubmit = () => {
    loadFeed(newFeedURL);
    setNewFeedURL("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
    </Modal>
  );
};

export default connect(null, { loadFeed })(NewFeedModal);
