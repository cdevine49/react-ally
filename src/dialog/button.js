import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { bool, element, func, number } from 'prop-types';

export const ButtonContext = createContext({});
export const Button = React.forwardRef(
  (
    {
      afterOpen = () => {},
      afterClose = () => {},
      closeTimeoutDuration,
      initializeOpen = false,
      returnFocus,
      modal,
      ...props
    },
    ref
  ) => {
    if (!ref) {
      throw new Error('DialogOpenButton requires a ref');
    }

    const [isOpen, setIsOpen] = useState(initializeOpen);
    const closeTimeout = useRef({});
    const close = () => {
      const _close = () => setIsOpen(false);
      const _isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);
      if (_isNumeric(closeTimeoutDuration)) {
        closeTimeout.current = setTimeout(_close, closeTimeoutDuration);
      } else {
        _close();
      }
    };
    const element = document.createElement('div');
    const dialogRoot = useRef(element);

    const onOpen = func => () => {
      if (isOpen) {
        return func();
      }
    };

    const onClose = func => () => {
      if (isOpen) {
        return func;
      }
    };

    const detachDialog = () => {
      if (dialogRoot.current.parentNode) {
        dialogRoot.current.parentNode.removeChild(dialogRoot.current);
      }
    };

    const setFocus = () => {
      if (returnFocus && returnFocus.current) {
        returnFocus.current.focus();
      } else {
        ref.current.focus();
      }
    };

    const hideRootFromScreenReaders = () => {
      let root = ref.current;
      while (root.parentElement !== root.ownerDocument.body) {
        root = root.parentElement;
      }
      root.setAttribute('aria-hidden', true);

      return () => {
        root.setAttribute('aria-hidden', false);
      };
    };

    useEffect(onClose(detachDialog), [isOpen]);
    useEffect(onClose(setFocus), [isOpen]);
    useEffect(onClose(afterClose), [isOpen]);
    useEffect(onOpen(hideRootFromScreenReaders), [isOpen]);
    useEffect(onOpen(afterOpen), [isOpen]);

    const attachDialog = () => {
      if (isOpen) {
        document.body.appendChild(dialogRoot.current);
        return ReactDOM.createPortal(modal, dialogRoot.current);
      }
    };

    return (
      <ButtonContext.Provider value={{ isOpen, close }}>
        <>
          <button
            ref={ref}
            {...props}
            onClick={() => {
              clearTimeout(closeTimeout.current);
              setIsOpen(true);
            }}
          />
          {attachDialog()}
        </>
      </ButtonContext.Provider>
    );
  }
);

Button.displayName = 'DialogOpenButton';

Button.propTypes = {
  afterOpen: func,
  afterClose: func,
  closeTimeoutDuration: number,
  initializeOpen: bool,
  modal: element.isRequired,
  returnFocus: element
};
