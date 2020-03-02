import React from "react";

import { version } from "../../../package.json";

const Footer = () => {
  return (
    <footer className="text-center py-4 text-gray-500">Feedst {version}</footer>
  );
};

export default Footer;
