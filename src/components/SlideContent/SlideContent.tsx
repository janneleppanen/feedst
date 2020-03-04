import React from "react";
import ReactDOM from "react-dom";

import usePortal from "../../utils/usePortal";

interface Props {
  onClose: () => void;
}

const SlideContent: React.FC<Props> = ({ children, onClose }) => {
  const target = usePortal("slide-content-root");
  const overlayElement = React.useRef(null);

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
      <div className="fixed right-0 top-0 bottom-0 bg-white p-10 w-full max-w-6xl shadow-2xl overflow-auto">
        {children}
      </div>
    </div>,
    target
  );
};

export default SlideContent;
