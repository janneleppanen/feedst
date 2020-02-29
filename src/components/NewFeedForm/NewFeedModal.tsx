import React from "react";

import Modal from "../common/Modal";
import NewFeedForm from "./NewFeedForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewFeedModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-4 font-bold text-lg text-gray-700">
        URL of the RSS feed
      </h2>
      <NewFeedForm />
    </Modal>
  );
};

export default NewFeedModal;
