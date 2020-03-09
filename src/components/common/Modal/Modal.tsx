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
    <>
      <div
        tabIndex={0}
        role="button"
        ref={overlayElement}
        className="modal-overlay dark-overlay"
        onMouseDown={e => {
          if (e.target === overlayElement.current) {
            onClose();
          }
        }}
      />

      <div className="modal-container">
        <div className="modal">
          <button
            className="absolute top-0 right-0 py-2 px-4 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>,
    target
  );
};

export default Modal;
