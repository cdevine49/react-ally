import React, { useEffect } from 'react';
import { element, object } from 'prop-types';
import { TAB } from '../keys';

export const FocusTrap = ({
  children,
  firstTabbableElementRef,
  initialFocusElementRef,
  lastTabbableElementRef,
  wrapperRef
}) => {
  const setInitialFocus = () => {
    (initialFocusElementRef || firstTabbableElementRef).current.focus();
  };

  useEffect(setInitialFocus, []);

  const onFirstTabbableKeyDown = () => {
    const onTab = e => {
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
    firstTabbableElementRef.current.addEventListener('keydown', onTab);
    return () => {
      firstTabbableElementRef.current.removeEventListener('keydown', onTab);
    };
  };

  useEffect(onFirstTabbableKeyDown, []);

  const onLastTabbableKeyDown = () => {
    const onTab = e => {
      if (!e.shiftKey && e.keyCode === TAB) {
        e.preventDefault();
        firstTabbableElementRef.current.focus();
      }
    };
    lastTabbableElementRef.current.addEventListener('keydown', onTab);
    return () => {
      lastTabbableElementRef.current.removeEventListener('keydown', onTab);
    };
  };

  useEffect(onLastTabbableKeyDown, []);

  const onWrapperClick = () => {
    const onTab = e => {
      if (e.keyCode === TAB && e.shiftKey) {
        if (wrapperRef.current === document.activeElement) {
          e.preventDefault();
          if (lastTabbableElementRef.current) {
            lastTabbableElementRef.current.focus();
          } else {
            firstTabbableElementRef.current.focus();
          }
        }
      }
    };

    wrapperRef.current.addEventListener('keydown', onTab);
    return () => {
      wrapperRef.current.removeEventListener('keydown', onTab);
    };
  };
  useEffect(onWrapperClick, []);

  return <>{children && React.cloneElement(children, { tabIndex: -1 })}</>;
};

FocusTrap.propTypes = {
  children: element.isRequired,
  firstTabbableElementRef: object.isRequired,
  initialFocusElementRef: object,
  lastTabbableElementRef: object.isRequired,
  wrapperRef: object.isRequired
};
