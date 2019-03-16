import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { ArrowTrap } from '../src/arrow-trap';
import { HOME, END, LEFT, RIGHT, UP, DOWN } from '../src/keys';

afterEach(cleanup);

const FocusChild = ({ focused, testid, setFocusOnKeyDown }) => (
  <button data-testid={testid} onKeyDown={setFocusOnKeyDown}>{`${!!focused}`}</button>
);

const CHILD_COUNT = 3;

const Component = () => {
  const children = [];
  for (let i = 0; i < CHILD_COUNT; i++) {
    children.push(<FocusChild key={i} testid={i} />);
  }
  return <ArrowTrap>{children}</ArrowTrap>;
};

const button = (index, bool) => `<button
    data-testid="${index}"
  >
    ${bool}
  </button>`;

const snapshot = focusedIndex => `
<DocumentFragment>
  ${button(0, focusedIndex === 0)}
  ${button(1, focusedIndex === 1)}
  ${button(2, focusedIndex === 2)}
</DocumentFragment>
`;

test('initial render', () => {
  const { asFragment } = render(<Component />);
  expect(asFragment()).toMatchInlineSnapshot(snapshot());
});

test('HOME', () => {
  const { asFragment, getByTestId } = render(<Component />);
  const firstButton = getByTestId('0');
  fireEvent.keyDown(firstButton, {
    key: 'HOME',
    keyCode: HOME
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(0));

  const secondButton = getByTestId('1');
  fireEvent.keyDown(secondButton, {
    key: 'HOME',
    keyCode: HOME
  });

  expect(asFragment()).toMatchInlineSnapshot(snapshot(0));
  const thirdButton = getByTestId('2');
  fireEvent.keyDown(thirdButton, {
    key: 'HOME',
    keyCode: HOME
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(0));
});

test('END', () => {
  const { asFragment, getByTestId } = render(<Component />);
  const firstButton = getByTestId('0');
  fireEvent.keyDown(firstButton, {
    key: 'END',
    keyCode: END
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(2));

  const secondButton = getByTestId('1');
  fireEvent.keyDown(secondButton, {
    key: 'END',
    keyCode: END
  });

  expect(asFragment()).toMatchInlineSnapshot(snapshot(2));
  const thirdButton = getByTestId('2');
  fireEvent.keyDown(thirdButton, {
    key: 'END',
    keyCode: END
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(2));
});

test('LEFT', () => {
  const { asFragment, getByTestId } = render(<Component />);
  const firstButton = getByTestId('0');
  fireEvent.keyDown(firstButton, {
    key: 'LEFT',
    keyCode: LEFT
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(2));

  const secondButton = getByTestId('1');
  fireEvent.keyDown(secondButton, {
    key: 'LEFT',
    keyCode: LEFT
  });

  expect(asFragment()).toMatchInlineSnapshot(snapshot(0));
  const thirdButton = getByTestId('2');
  fireEvent.keyDown(thirdButton, {
    key: 'LEFT',
    keyCode: LEFT
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(1));
});

test('RIGHT', () => {
  const { asFragment, getByTestId } = render(<Component />);
  const firstButton = getByTestId('0');
  fireEvent.keyDown(firstButton, {
    key: 'RIGHT',
    keyCode: RIGHT
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(1));

  const secondButton = getByTestId('1');
  fireEvent.keyDown(secondButton, {
    key: 'RIGHT',
    keyCode: RIGHT
  });

  expect(asFragment()).toMatchInlineSnapshot(snapshot(2));
  const thirdButton = getByTestId('2');
  fireEvent.keyDown(thirdButton, {
    key: 'RIGHT',
    keyCode: RIGHT
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(0));
});

test('UP', () => {
  const { asFragment, getByTestId } = render(<Component />);
  const firstButton = getByTestId('0');
  fireEvent.keyDown(firstButton, {
    key: 'UP',
    keyCode: UP
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(2));

  const secondButton = getByTestId('1');
  fireEvent.keyDown(secondButton, {
    key: 'UP',
    keyCode: UP
  });

  expect(asFragment()).toMatchInlineSnapshot(snapshot(0));
  const thirdButton = getByTestId('2');
  fireEvent.keyDown(thirdButton, {
    key: 'UP',
    keyCode: UP
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(1));
});

test('DOWN', () => {
  const { asFragment, getByTestId } = render(<Component />);
  const firstButton = getByTestId('0');
  fireEvent.keyDown(firstButton, {
    key: 'DOWN',
    keyCode: DOWN
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(1));

  const secondButton = getByTestId('1');
  fireEvent.keyDown(secondButton, {
    key: 'DOWN',
    keyCode: DOWN
  });

  expect(asFragment()).toMatchInlineSnapshot(snapshot(2));
  const thirdButton = getByTestId('2');
  fireEvent.keyDown(thirdButton, {
    key: 'DOWN',
    keyCode: DOWN
  });
  expect(asFragment()).toMatchInlineSnapshot(snapshot(0));
});
