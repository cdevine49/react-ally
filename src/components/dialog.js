import React, { Fragment, createContext, forwardRef, useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Button from '../elements/button';
import { bool, element, object, string } from 'prop-types';
import { needsDialogDescription, needsDialogLabel } from '../errors';

const DialogContext = createContext({});

const Dialog = ({ initializeOpen, children }) => {
  const [open, toggleOpen] = useState(initializeOpen);
  const [dialogRoot] = useState(document.createElement('div'));

  useEffect(
    () => {
      if (open) {
        return () => {
          if (dialogRoot.parentNode) {
            dialogRoot.parentNode.removeChild(dialogRoot);
          }
        };
      }
    },
    [open]
  );

  useEffect(
    () => {
      if (open) {
        const hiddenChildren = [];
        const children = document.body.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child === dialogRoot) {
            continue;
          }
          if (child.getAttribute('aria-hidden') === 'true') {
            continue;
          }

          child.setAttribute('aria-hidden', true);
          hiddenChildren.push(child);
        }
        return () => {
          for (let i = 0; i < hiddenChildren.length; i++) {
            hiddenChildren[i].setAttribute('aria-hidden', false);
          }
        };
      }
    },
    [open]
  );
  return (
    <DialogContext.Provider value={{ open, toggleOpen }}>
      <Fragment>
        {React.Children.map(children, child => {
          const displayName = child.type.displayName;
          if (['DialogOpenButton', 'Styled(DialogOpenButton)'].find(el => el === displayName)) {
            return React.cloneElement(child, {
              onClick: () => toggleOpen(true)
            });
          }
          if (open) {
            if (['DialogContent', 'Styled(DialogContent)'].find(el => el === displayName)) {
              document.body.appendChild(dialogRoot);
              return ReactDOM.createPortal(child, dialogRoot);
            }
          }
        })}
      </Fragment>
    </DialogContext.Provider>
  );
};

Dialog.propTypes = { initializeOpen: bool };

Dialog.defaultProps = { initializeOpen: false };

const DialogOpenButton = props => {
  const buttonRef = useRef(null);
  const { open } = useContext(DialogContext);
  useEffect(
    () => {
      if (open) {
        return () => {
          buttonRef.current.focus();
        };
      }
    },
    [open]
  );

  return <Button ref={buttonRef} {...props} />;
};

DialogOpenButton.displayName = 'DialogOpenButton';

const DialogContentContext = createContext({});

const DialogContent = ({ closeOnOverlayClick, overlayBackgroundColor, overlayProps, ...props }) => {
  const { toggleOpen } = useContext(DialogContext);
  const contentRef = useRef(null);
  const firstTabbableElementRef = useRef(null);
  const leastDangerousElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);

  useEffect(() => {
    disableBodyScroll(contentRef.current);
    return () => {
      enableBodyScroll(contentRef.current);
    };
  }, []);

  useEffect(() => {
    if (leastDangerousElementRef.current) {
      leastDangerousElementRef.current.focus();
    } else if (firstTabbableElementRef.current) {
      firstTabbableElementRef.current.focus();
    }
  }, []);

  let ariaLabelledby, ariaDescribedby;
  React.Children.forEach(props.children, child => {
    if (ariaLabelledby && ariaDescribedby) {
      return;
    }
    const displayName = child && child.type && child.type.displayName;
    if (['DialogLabel', 'Styled(DialogLabel)'].find(el => el === displayName)) {
      ariaLabelledby = child.props.id;
    }
    if (['DialogDescription', 'Styled(DialogDescription)'].find(el => el === displayName)) {
      ariaDescribedby = child.props.id;
    }
  });
  return (
    <DialogContentContext.Provider value={{ firstTabbableElementRef, leastDangerousElementRef, lastTabbableElementRef }}>
      <div
        onClick={() => closeOnOverlayClick && toggleOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayBackgroundColor
        }}
        {...overlayProps}
      >
        <div
          aria-describedby={ariaDescribedby}
          aria-labelledby={ariaLabelledby}
          aria-modal
          onClick={e => {
            e.stopPropagation();
          }}
          onKeyDown={e => {
            e.stopPropagation();
            // escape
            if (e.keyCode === 27) {
              toggleOpen(false);
            }
          }}
          ref={contentRef}
          role="dialog"
          {...props}
        />
      </div>
    </DialogContentContext.Provider>
  );
};

DialogContent.defaultProps = {
  closeOnOverlayClick: true,
  overlayBackgroundColor: 'rgba(255,255,255,0.75)',
  overlayProps: {}
};

DialogContent.propTypes = {
  closeOnOverlayClick: bool,
  children: (props, _, componentName) => {
    let needsLabel = true;
    React.Children.forEach(props.children, child => {
      if (!needsLabel) {
        return;
      }
      const displayName = child && child.type && child.type.displayName;
      if (['DialogLabel', 'Styled(DialogLabel)'].find(el => el === displayName)) {
        needsLabel = false;
      }
    });
    if (needsLabel) {
      return new Error(needsDialogLabel(componentName));
    }
  },
  role: (props, _, componentName) => {
    if (props.role !== 'alertdialog') {
      return;
    }
    let needsDescription = true;
    React.Children.forEach(props.children, child => {
      if (!needsDescription) {
        return;
      }
      const displayName = child && child.type && child.type.displayName;
      if (['DialogDescription', 'Styled(DialogDescription)'].find(el => el === displayName)) {
        needsDescription = false;
      }
    });
    if (needsDescription) {
      return new Error(needsDialogDescription(componentName));
    }
  },
  overlayBackgroundColor: string,
  overlayProps: object
};

DialogContent.displayName = 'DialogContent';

const DialogLabel = props => <h2 {...props} />;

DialogLabel.propTypes = {
  id: string.isRequired
};

DialogLabel.displayName = 'DialogLabel';

const DialogDescription = props => <div {...props} />;

DialogDescription.propTypes = {
  id: string.isRequired
};

DialogDescription.displayName = 'DialogDescription';

const DialogCloseButton = forwardRef((props, ref) => {
  const { toggleOpen } = useContext(DialogContext);
  return <button {...props} ref={ref} onClick={() => toggleOpen(false)} />;
});

const LeastDangerousElement = props => {
  const { leastDangerousElementRef } = useContext(DialogContentContext);

  return (
    <Fragment>
      {React.cloneElement(props.children, {
        ref: leastDangerousElementRef
      })}
    </Fragment>
  );
};

LeastDangerousElement.propTypes = {
  children: element.isRequired
};

const FirstTabbableElement = props => {
  const { firstTabbableElementRef, lastTabbableElementRef } = useContext(DialogContentContext);

  const onKeyDown = e => {
    if (e.shiftKey && e.keyCode === 9) {
      console.log(e);
      e.preventDefault();
      lastTabbableElementRef.current.focus();
    }
    props.onKeyDown && props.onKeyDown(e);
  };

  return (
    <Fragment>
      {React.cloneElement(props.children, {
        ref: firstTabbableElementRef,
        onKeyDown
      })}
    </Fragment>
  );
};

FirstTabbableElement.propTypes = {
  children: element.isRequired
};

const LastTabbableElement = props => {
  const { firstTabbableElementRef, lastTabbableElementRef } = useContext(DialogContentContext);

  const onKeyDown = e => {
    if (!e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      firstTabbableElementRef.current.focus();
    }
    props.onKeyDown && props.onKeyDown(e);
  };

  return (
    <Fragment>
      {React.cloneElement(props.children, {
        ref: lastTabbableElementRef,
        onKeyDown
      })}
    </Fragment>
  );
};

LastTabbableElement.propTypes = {
  children: element.isRequired
};

export {
  DialogCloseButton,
  Dialog,
  DialogOpenButton,
  DialogContent,
  DialogLabel,
  DialogDescription,
  FirstTabbableElement,
  LastTabbableElement,
  LeastDangerousElement
};
