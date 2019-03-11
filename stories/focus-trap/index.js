import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { FocusTrap, FirstTabbableElement, LastTabbableElement } from '../../src/focus-trap';

const Component = () => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (show) {
      return () => {
        buttonRef.current.focus();
      };
    }
  }, [show]);

  return (
    <>
      <button ref={buttonRef} onClick={() => setShow(true)}>
        Enter Focus Trap
      </button>
      {show && (
        <FocusTrap ref={ref}>
          <FirstTabbableElement>
            {(props, ref) => (
              <button ref={ref} onClick={() => setShow(false)} {...props}>
                Close Focus Trap
              </button>
            )}
          </FirstTabbableElement>
          <div>Not focusable</div>
          <input />
          <LastTabbableElement>
            {(props, ref) => (
              <button ref={ref} {...props}>
                Last Tabbable Element in Focus Trap
              </button>
            )}
          </LastTabbableElement>
        </FocusTrap>
      )}
    </>
  );
};

storiesOf('Focus Trap', module).add('Default', () => <Component />);
