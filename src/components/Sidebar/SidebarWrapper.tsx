import React from "react";
import { Link } from "react-router-dom";

const SidebarWrapper: React.FC = ({ children }) => {
  return (
    <aside className="bg-gray-800 w-64 p-6 text-white flex-col">
      <Link
        className="text-green-400 text-lg font-bold tracking-wider mb-10 block flex"
        to="/"
      >
        <div className="w-6 h-6 border-4 border-green-400 rounded-full mr-2"></div>
        RSS Reader
      </Link>
      {children}
    </aside>
  );
};

export default SidebarWrapper;
