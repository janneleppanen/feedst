import React from "react";
import ReactDOM from "react-dom";

import usePortal from "../../../utils/usePortal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  const target = usePortal("modal-root");
  const overlayElement = React.useRef(null);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={overlayElement}
      className="fixed dark-overlay top-0 bottom-0 left-0 right-0 flex items-center justify-center"
      onMouseDown={e => {
        if (e.target === overlayElement.current) {
          onClose();
        }
      }}
    >
      <div className="w-1/2 bg-white px-10 py-16 rounded-md relative shadow-lg">
        <button
          className="absolute top-0 right-0 py-2 px-4 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    target
  );
};

export default Modal;
