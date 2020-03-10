import React, { ButtonHTMLAttributes } from "react";

const Button: React.FC<ButtonHTMLAttributes<{}>> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="py-2 px-5 bg-green-600 text-white rounded-md font-bold"
    >
      {children}
    </button>
  );
};

export default Button;
