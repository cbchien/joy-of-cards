import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./Input.scss";

const Input = ({ type = 'text', title, className, onChange, ...otherProps }) => {
  const css = classnames("joy-of-cards-input-text", className);

  return (
    <span>
      {title}:{" "}
      <input type={type} className={css} onChange={onChange} {...otherProps} />
    </span>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string
};

Input.defaultProps = {
  onChange: () => {},
  className: ""
};

export default Input;
