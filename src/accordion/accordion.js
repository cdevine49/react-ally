import React from 'react';

export const Accordion = ({ children, accordionId, focused, isOpen, multi, onClickHeader, setFocusOnKeyDown }) => (
  <>
    {React.Children.map(children, child =>
      React.cloneElement(child, { accordionId, isOpen, focused, multi, onClickHeader, setFocusOnKeyDown })
    )}
  </>
);
