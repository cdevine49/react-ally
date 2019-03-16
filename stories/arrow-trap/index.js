import React, { useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { ArrowTrap } from '../../src/arrow-trap';

const FocusableElement = ({ focused, setFocusOnKeyDown }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (focused) {
      ref.current.focus();
    }
  }, [focused]);
  return (
    <button ref={ref} onKeyDown={setFocusOnKeyDown}>{`I am${
      focused ? '' : ' not'
    } focused`}</button>
  );
};

storiesOf('Arrow Trap', module).add('Default', () => (
  <ArrowTrap>
    <FocusableElement />
    <FocusableElement />
    <FocusableElement />
    <FocusableElement />
  </ArrowTrap>
));
