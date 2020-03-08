import React from "react";
import { Link } from "react-router-dom";

import Logo from "../common/Logo";

const SidebarWrapper: React.FC = ({ children }) => {
  return (
    <aside className="bg-gray-800 w-64 p-6 text-white flex-col sidebar">
      <Link className="mb-10 block flex items-center" to="/">
        <Logo />
      </Link>
      {children}
    </aside>
  );
};

export default SidebarWrapper;
