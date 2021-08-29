import React from "react";

import { ReactComponent as Illustration } from "../../assets/empty-state-illustration.svg";
import NewFeedForm from "../NewFeedForm/NewFeedForm";

interface Props {
  onDemoButtonClick: () => void;
}

const EmtpyState: React.FC<Props> = ({ onDemoButtonClick }) => {
  return (
    <div className="max-w-sm w-full h-auto mx-auto">
      <div className="mb-6">
        <Illustration className="w-full h-auto mx-auto" />
      </div>

      <blockquote className="max-w-md mx-auto mb-20 text-gray-600 text-2xl font-bold text-center">
        “Think before you speak.
        <br /> Read before you think.”
        <span className="block text-lg pt-2 font-normal">– Fran Lebowitz</span>
      </blockquote>

      <h2 className="mb-4 font-bold text-gray-700 text-lg text-center">
        Add your first RSS feed URL
      </h2>
      <NewFeedForm />

      <p className="text-center mt-12 mb-12">or</p>

      <button
        className="text-green-600 text-center w-full font-bold text-base"
        onClick={onDemoButtonClick}
      >
        Add a bunch of feeds to test out Feedst
      </button>
    </div>
  );
};

export default EmtpyState;
