import React from 'react';

export const Overlay = ({ backgroundColor, ...props }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor
    }}
    {...props}
  />
);
