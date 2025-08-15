import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.body // Render into the body
  );
};

export default Portal;