import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/feedst-logo.svg";

const SidebarWrapper: React.FC = ({ children }) => {
  return (
    <aside className="bg-gray-800 w-64 p-6 text-white flex-col">
      <Link
        className="text-xl font-bold tracking-wider mb-10 block flex items-center"
        to="/"
      >
        <div className="mr-4 w-8">
          <Logo className="w-full" />
        </div>
        Feedst
      </Link>
      {children}
    </aside>
  );
};

export default SidebarWrapper;
