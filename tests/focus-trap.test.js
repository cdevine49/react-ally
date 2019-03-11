import React, { useRef } from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import {
  FocusTrap,
  FirstTabbableElement,
  LastTabbableElement,
  InitialFocusElement
} from '../src/focus-trap';

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

const Component = ({ firstFocus, lastFocus, ...props }) => {
  const ref = useRef(null);
  return (
    <FocusTrap ref={ref} data-testid="root" {...props}>
      <FirstTabbableElement>
        {(props, ref) => <button ref={ref} data-testid="first" onFocus={firstFocus} {...props} />}
      </FirstTabbableElement>
      {props.children}
      <LastTabbableElement>
        {(props, ref) => <button ref={ref} data-testid="last" onFocus={lastFocus} {...props} />}
      </LastTabbableElement>
    </FocusTrap>
  );
};

let Wrapper, firstFocus, lastFocus;
beforeEach(() => {
  firstFocus = jest.fn();
  lastFocus = jest.fn();
  Wrapper = props => <Component firstFocus={firstFocus} lastFocus={lastFocus} {...props} />;
});

test('missing ref', () => {
  expect(() => render(<FocusTrap />)).toThrowErrorMatchingInlineSnapshot(
    `"FocusTrap requires a ref"`
  );
});

describe('initial focus', () => {
  test('default', () => {
    render(<Wrapper />);
    expect(firstFocus).toHaveBeenCalled();
    expect(lastFocus).not.toHaveBeenCalled();
  });

  test('focusLast', () => {
    render(<Wrapper focusLast />);
    expect(lastFocus).toHaveBeenCalled();
    expect(firstFocus).not.toHaveBeenCalled();
  });

  test('InitialFocusElement', () => {
    const initialFocus = jest.fn();
    render(
      <Wrapper>
        <InitialFocusElement>
          {ref => <button ref={ref} data-testid="initial" onFocus={initialFocus} />}
        </InitialFocusElement>
      </Wrapper>
    );
    expect(initialFocus).toHaveBeenCalled();
    expect(lastFocus).not.toHaveBeenCalled();
    expect(firstFocus).not.toHaveBeenCalled();
  });
});

describe('trapping focus', () => {
  test('shift+tab from first tabbable element', () => {
    const { getByTestId } = render(<Wrapper />);

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
});
