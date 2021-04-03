import React from 'react';
import { storiesOf } from '@storybook/react';
import { ArrowTrap, FocusContext } from '../../src/arrow-trap';

const FocusableElement = () => {
  const ref = React.useRef(null);
	const [focused, setFocused] = React.useState(false)
	const { onKeyDown, register } = React.useContext(FocusContext);

	React.useEffect(() => {
		register(ref.current);
	}, [register]);

  return (
    <button ref={ref} onBlur={() => setFocused(false)} onFocus={() => setFocused(true)} onKeyDown={onKeyDown}>{`I am${
      focused ? '' : ' not'
    } focused`}</button>
  );
};

storiesOf('Arrow Trap', module).add('Arrow Trap', () => (
  <ArrowTrap>
    <FocusableElement />
    <FocusableElement />
    <FocusableElement />
    <FocusableElement />
  </ArrowTrap>
));
