import React from "react";
import PropTypes from "prop-types";

import "./Modal.scss"

const Modal = ({
  children,
  onDismiss,
  restrictClose,
  showCloseButton,
}) => {
  const onSelfDismiss = restrictClose ? () => {} : onDismiss;

  return (
    <div className="modal-wrapper">
      <div
        className="background"
        role="tab"
        tabIndex={0}
        onClick={onSelfDismiss}
        aria-hidden="true"
      />
      <div className="modal">
        <div className="modal-content">
          {showCloseButton && (
            <button
              aria-label="Close"
              className="modal-close-btn"
              onClick={onDismiss}
            >
              <span>X </span>
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onDismiss: PropTypes.func,
  restrictClose: PropTypes.bool,
  showCloseButton: PropTypes.bool,
};

Modal.defaultProps = {
  children: null,
  onDismiss() {},
  restrictClose: false,
  showCloseButton: true,
};

export default Modal;
