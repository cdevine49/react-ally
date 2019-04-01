import React from 'react';

export const Accordion = ({ children, ...props }) => (
  <>{React.Children.map(children, child => React.cloneElement(child, { ...props }))}</>
);
