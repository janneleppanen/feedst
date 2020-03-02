import React from "react";

import { ReactComponent as LogoSVG } from "../../../assets/feedst-logo.svg";

const Logo = () => {
  return (
    <div className="inline-flex text-white text-xl font-bold tracking-wider ">
      <div className="mr-4 w-8">
        <LogoSVG className="w-full" />
      </div>
      Feedst
    </div>
  );
};

export default Logo;
