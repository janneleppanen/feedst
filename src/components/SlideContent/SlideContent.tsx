import React from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import usePortal from "../../utils/usePortal";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const SlideContent: React.FC<Props> = ({ children, onClose, isOpen }) => {
  const target = usePortal("slide-content-root");
  const overlayElement = React.useRef(null);

  return ReactDOM.createPortal(
    <ReactCSSTransitionGroup
      transitionName="slide"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={150}
    >
      {isOpen && (
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
            <button
              className="absolute top-0 right-0 py-4 px-6 text-2xl"
              onClick={() => onClose()}
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </ReactCSSTransitionGroup>,
    target
  );
};

export default SlideContent;
