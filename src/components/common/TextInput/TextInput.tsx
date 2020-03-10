import React from "react";
import classNames from "classnames";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showLabel?: boolean;
}

const TextInput = ({ children, label, showLabel = false, ...rest }: Props) => {
  return (
    <>
      {label && (
        <label
          htmlFor={rest.id}
          className={classNames({ "sr-only": !showLabel })}
        >
          {label}
        </label>
      )}
      <input
        type="text"
        className="border border-gray-300 border-solid rounded-md py-2 px-4 pr-10 mr-2 flex-1 w-full"
        {...rest}
      />
    </>
  );
};

export default TextInput;
