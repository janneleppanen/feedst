import React from "react";

import { ReactComponent as Illustration } from "../../assets/empty-state-illustration.svg";
import NewFeedForm from "../NewFeedForm/NewFeedForm";

const EmtpyState = () => {
  return (
    <div class="max-w-sm w-full h-auto mx-auto">
      <div className="mb-6">
        <Illustration className="w-full h-auto mx-auto" />
      </div>

      <blockquote className="max-w-md mx-auto mb-20 text-gray-500 text-2xl font-bold text-center">
        “Think before you speak.
        <br /> Read before you think.”
        <span className="block text-lg pt-2 font-normal">– Fran Lebowitz</span>
      </blockquote>

      <h2 className="mb-4 font-bold text-gray-700 text-lg">
        Add your first RSS feed URL
      </h2>
      <NewFeedForm />
    </div>
  );
};

export default EmtpyState;
