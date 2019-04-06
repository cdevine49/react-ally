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

    useEffect(onClose(afterClose), [isOpen]);
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
