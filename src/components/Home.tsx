import React from "react";

import { FeedList } from "../App";

interface Props {
  feeds: FeedList;
  addFeed: (url: string) => void;
}

const Home = ({ addFeed }: Props) => {
  const [newFeedURL, setNewFeedURL] = React.useState<string>("");

  const handleFormSubmit = () => {
    addFeed(newFeedURL);
    setNewFeedURL("");
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <input
        className="border border-gray-300 border-solid rounded-md p-2 mr-2"
        type="text"
        value={newFeedURL}
        onChange={e => setNewFeedURL(e.currentTarget.value)}
      />
      <button className="py-2 px-5 bg-green-600 text-white rounded-md">
        Add new feed
      </button>
    </form>
  );
};

export default Home;
