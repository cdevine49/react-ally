import React, { forwardRef, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { bool, func, object, string } from 'prop-types';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Overlay } from './overlay';
import { FocusTrap } from '../focus-trap';
import { DialogContext } from './context';
import { ESC } from '../keys';

export const Dialog = forwardRef(
  (
    {
      close = () => {},
      closeOnOverlayClick = true,
      firstTabbableElementRef,
      isOpen = false,
      initialFocusElementRef,
      lastTabbableElementRef,
      onClick = () => {},
      onKeyDown = () => {},
      overlayBackgroundColor = 'rgba(255,255,255,0.75)',
      overlayProps = {},
      returnFocus = { current: document.activeElement },
      ...props
    },
    ref
  ) => {
    if (!ref) {
      throw new Error('Dialog requires a ref');
    }

    useEffect(() => {
      if (isOpen && returnFocus.current === document.body) {
        throw new Error(
          "Dialog did not receive a valid element to send focus after closing.  This usually occurs because the dialog initialized open, but wasn't passed a returnFocus ref."
        );
      }
    }, [isOpen]);

    const dialogRoot = useRef(document.createElement('div'));

    const [labelledby, setLabelledby] = useState('');
    const [describedby, setDescribedby] = useState('');

    useEffect(() => {
      if (isOpen) {
        let root = returnFocus.current;
        while (root.parentElement !== root.ownerDocument.body && root !== root.ownerDocument.body) {
          root = root.parentElement;
        }
        root.setAttribute('aria-hidden', true);

        return () => {
          root.setAttribute('aria-hidden', false);
        };
      }
    });

    const lockBody = () => {
      disableBodyScroll(ref.current);
      return () => {
        enableBodyScroll(ref.current);
      };
    };

    useEffect(lockBody, [isOpen]);

    useEffect(() => {
      if (isOpen) {
        return () => {
          if (dialogRoot.current.parentNode) {
            dialogRoot.current.parentNode.removeChild(dialogRoot.current);
          }
        };
      }
    }, [isOpen]);

    useEffect(() => {
      if (isOpen) {
        // TODO: figure out why react-testing-library needs this
        const current = returnFocus.current;
        return () => {
          current.focus();
        };
      }
    }, [isOpen]);

    const portal = (
      <Overlay
        backgroundColor={overlayBackgroundColor}
        {...overlayProps}
        onClick={e => {
          if (closeOnOverlayClick) {
            close(e);
          }
        }}
      >
        <DialogContext.Provider
          value={{
            contentId: props.id,
            setDescribedby,
            setLabelledby
          }}
        >
          <FocusTrap
            firstTabbableElementRef={firstTabbableElementRef}
            initialFocusElementRef={initialFocusElementRef}
            lastTabbableElementRef={lastTabbableElementRef}
            wrapperRef={ref}
          >
            <div
              ref={ref}
              aria-describedby={describedby}
              aria-labelledby={labelledby}
              aria-modal
              id="test-dialog"
              role="dialog"
              {...props}
              onClick={e => {
                e.stopPropagation();
                onClick(e);
              }}
              onKeyDown={e => {
                if (e.keyCode === ESC) {
                  close(e);
                }
                onKeyDown(e);
              }}
            />
          </FocusTrap>
        </DialogContext.Provider>
      </Overlay>
    );

    if (isOpen) {
      document.body.appendChild(dialogRoot.current);
      return ReactDOM.createPortal(portal, dialogRoot.current);
    }

    return null;
  }
);

Dialog.displayName = 'Dialog';

Dialog.propTypes = {
  close: func.isRequired,
  closeOnOverlayClick: bool,
  firstTabbableElementRef: object.isRequired,
  id: string.isRequired,
  isOpen: bool.isRequired,
  initialFocusElementRef: object,
  lastTabbableElementRef: object,
  onClick: func,
  onKeyDown: func,
  overlayBackgroundColor: string,
  overlayProps: object,
  returnFocus: object
};
