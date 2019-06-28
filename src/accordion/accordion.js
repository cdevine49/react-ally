import React from 'react';

export const Accordion = ({ children, accordionId, isOpen, multi, onClickHeader }) => (
  <>
    {React.Children.map(children, child =>
      React.cloneElement(child, { accordionId, isOpen, multi, onClickHeader })
    )}
  </>
);
