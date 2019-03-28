import React from 'react';

export const Button = props => (
  <button
    {...props}
    aria-hidden
    onMouseDown={e => {
      e.preventDefault();
    }}
    tabIndex={-1}
  />
);
