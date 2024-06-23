import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = ({ message }) => (
  <div className="loader-container">
    <div className="loader"></div>
    <p>{message}</p>
  </div>
);

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loader;
