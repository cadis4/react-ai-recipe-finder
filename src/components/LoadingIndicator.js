import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <div className="indicator-card"></div>
      <div className="indicator-card"></div>
      <div className="indicator-card"></div>
    </div>
  );
};

export default LoadingIndicator;
