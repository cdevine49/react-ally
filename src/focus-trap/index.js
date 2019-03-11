import React, { createContext, forwardRef, useEffect, useRef } from 'react';
import {
  FirstTabbableElement,
  LastTabbableElement,
  InitialFocusElement
} from './tabbable-elements';
import { TAB } from '../keys';

export const FocusTrapContext = createContext({});

const FocusTrap = forwardRef(({ focusLast, onKeyDown = () => {}, ...props }, ref) => {
  if (!ref) {
    throw new Error('FocusTrap requires a ref');
  }
  const firstTabbableElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);
  const initialFocusRef = useRef(null);

  const setInitialFocus = () => {
    let element;
    if (initialFocusRef) {
      element = initialFocusRef.current;
    }

    if (!element) {
      if (focusLast) {
        element = lastTabbableElementRef.current;
      } else {
        element = firstTabbableElementRef.current;
      }
    }
    element.focus();
  };

  useEffect(setInitialFocus, []);

  return (
    <FocusTrapContext.Provider
      value={{ firstTabbableElementRef, initialFocusRef, lastTabbableElementRef }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        {...props}
        onKeyDown={e => {
          if (e.keyCode === TAB && e.shiftKey) {
            if (ref.current === document.activeElement) {
              e.preventDefault();
              if (lastTabbableElementRef.current) {
                lastTabbableElementRef.current.focus();
              } else {
                firstTabbableElementRef.current.focus();
              }
            }
          }
          onKeyDown(e);
        }}
      />
    </FocusTrapContext.Provider>
  );
});

export { FocusTrap, FirstTabbableElement, InitialFocusElement, LastTabbableElement };
