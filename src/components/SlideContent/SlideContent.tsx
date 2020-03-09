import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import usePortal from "../../utils/usePortal";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const SlideContent: React.FC<Props> = ({ children, onClose, isOpen }) => {
  const target = usePortal("slide-content-root");
  const overlayElement = React.useRef(null);

  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} classNames="slide" timeout={250} unmountOnExit>
      <div>
        <div
          tabIndex={0}
          role="button"
          ref={overlayElement}
          className="slide-content-overlay dark-overlay"
          onMouseDown={e => {
            if (e.target === overlayElement.current) {
              onClose();
            }
          }}
        />
        <div className="slide-content" role="dialog" tabIndex={-1}>
          <button
            className="absolute top-0 right-0 py-4 px-6 text-2xl"
            onClick={() => onClose()}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>,
    target
  );
};

export default SlideContent;
