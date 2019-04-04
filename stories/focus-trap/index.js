import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { FocusTrap } from '../../src/focus-trap';

const Component = () => {
  const [show, setShow] = useState(false);
  const firstTabbableElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);
  const wrapperRef = useRef(null);
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
        <FocusTrap
          firstTabbableElementRef={firstTabbableElementRef}
          lastTabbableElementRef={lastTabbableElementRef}
          wrapperRef={wrapperRef}
        >
          <div ref={wrapperRef}>
            <button ref={firstTabbableElementRef} onClick={() => setShow(false)}>
              Close Focus Trap
            </button>
            <div>Not focusable</div>
            <input />
            <button ref={lastTabbableElementRef}>Last Tabbable Element in Focus Trap</button>
          </div>
        </FocusTrap>
      )}
    </>
  );
};

storiesOf('Focus Trap', module).add('Default', () => <Component />);
