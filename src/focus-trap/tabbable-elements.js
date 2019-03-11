import React, { forwardRef, useContext } from 'react';
import { func } from 'prop-types';
import { FocusTrapContext } from './index';
import { TAB } from '../keys';

const TabbableElement = forwardRef(({ onKeyDown, ...props }, ref) =>
  props.children({ onKeyDown }, ref)
);

export const FirstTabbableElement = props => {
  const { firstTabbableElementRef, lastTabbableElementRef } = useContext(FocusTrapContext);

  const handleFocus = e => {
    if (e.keyCode === TAB) {
      if (!lastTabbableElementRef.current) {
        // Keep focus on self
        e.preventDefault();
      } else if (e.shiftKey) {
        e.preventDefault();
        lastTabbableElementRef.current.focus();
      }
    }
  };

  return <TabbableElement ref={firstTabbableElementRef} onKeyDown={handleFocus} {...props} />;
};

FirstTabbableElement.propTypes = {
  children: func.isRequired
};

export const LastTabbableElement = props => {
  const { firstTabbableElementRef, lastTabbableElementRef } = useContext(FocusTrapContext);

  const handleFocus = e => {
    if (!e.shiftKey && e.keyCode === TAB) {
      e.preventDefault();
      firstTabbableElementRef.current.focus();
    }
  };

  return <TabbableElement ref={lastTabbableElementRef} onKeyDown={handleFocus} {...props} />;
};

LastTabbableElement.propTypes = {
  children: func.isRequired
};

export const InitialFocusElement = props => {
  const { initialFocusRef } = useContext(FocusTrapContext);

  return props.children(initialFocusRef);
};

InitialFocusElement.propTypes = {
  children: func.isRequired
};
