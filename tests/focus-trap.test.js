import React, { useRef } from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { FocusTrap } from '../src';

jest.useFakeTimers();

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

test('missing required props', () => {
  console.error = jest.fn();
  try {
    render(<FocusTrap />);
  } catch (_) {
    try {
      jest.runAllTimers();
    } catch (_) {}
  }
  const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`FocusTrap\`, but its value is \`undefined\`.
    in FocusTrap`;
  expect(console.error).toHaveBeenCalledWith(message('children'));
  expect(console.error).toHaveBeenCalledWith(message('firstTabbableElementRef'));
  expect(console.error).toHaveBeenCalledWith(message('wrapperRef'));
});

const Component = ({ firstFocus, lastFocus, setInitial = false }) => {
  const firstTabbableElementRef = useRef();
  const lastTabbableElementRef = useRef();
  const wrapperRef = useRef();
  return (
    <FocusTrap
      firstTabbableElementRef={firstTabbableElementRef}
      initialFocusElementRef={setInitial && lastTabbableElementRef}
      lastTabbableElementRef={lastTabbableElementRef}
      wrapperRef={wrapperRef}
    >
      <div ref={wrapperRef} data-testid="root">
        <button ref={firstTabbableElementRef} data-testid="first" onFocus={firstFocus} />
        <button />
        <div />
        <area />
        <input ref={lastTabbableElementRef} data-testid="last" onFocus={lastFocus} />}
      </div>
    </FocusTrap>
  );
};

let firstFocus, lastFocus, Wrapper;
beforeEach(() => {
  firstFocus = jest.fn();
  lastFocus = jest.fn();
  Wrapper = props => <Component firstFocus={firstFocus} lastFocus={lastFocus} {...props} />;
});

test('no initial focus ref', () => {
  render(<Wrapper />);
  jest.runAllTimers();
  expect(firstFocus).toHaveBeenCalled();
  expect(lastFocus).not.toHaveBeenCalled();
});

test('initial focus ref', () => {
  render(<Wrapper setInitial />);
  jest.runAllTimers();
  expect(firstFocus).not.toHaveBeenCalled();
  expect(lastFocus).toHaveBeenCalled();
});

test('shift+tab from first tabbable element', () => {
  const { getByTestId } = render(<Wrapper />);
  // Promise.resolve().then(() => jest.useFakeTimers());

  const firstButton = getByTestId('first');
  firstButton.focus();

  // ensure no false positives
  firstFocus.mockClear();
  lastFocus.mockClear();

  fireEvent.keyDown(firstButton, {
    key: 'Tab',
    keyCode: 9,
    shiftKey: true
  });
  expect(lastFocus).toHaveBeenCalled();
});

test('tab from last tabbable element', () => {
  const { getByTestId } = render(<Wrapper />);
  // Promise.resolve().then(() => jest.useFakeTimers());

  const lastButton = getByTestId('last');
  lastButton.focus();

  // ensure no false positives
  firstFocus.mockClear();
  lastFocus.mockClear();

  fireEvent.keyDown(lastButton, {
    key: 'Tab',
    keyCode: 9
  });
  expect(firstFocus).toHaveBeenCalled();
});

// not testing tab from wrapper because browsers will handle that
test('shift+tab from wrapper', () => {
  const { getByTestId } = render(<Wrapper />);
  // Promise.resolve().then(() => jest.useFakeTimers());

  const root = getByTestId('root');
  root.focus();

  // ensure no false positives
  firstFocus.mockClear();
  lastFocus.mockClear();

  fireEvent.keyDown(root, {
    key: 'Tab',
    keyCode: 9,
    shiftKey: true
  });
  expect(lastFocus).toHaveBeenCalled();
});
