import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
};

const Button = ({ className = '', onClick, children }) => (
  <button onClick={onClick} className={`button ${className}`}>
    { children }
  </button>
);

Button.propTypes = propTypes;

export default Button;