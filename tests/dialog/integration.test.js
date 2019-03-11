import React, { useRef } from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { DialogOpenButton, DialogContent, DialogCloseButton } from '../../src/';

jest.mock('../../src/focus-trap', () => ({
  FocusTrap: props => <div data-test-id="focus-trap">{props.children}</div>
}));

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

const modal = (props = {}, ref) => (
  <DialogContent
    ref={ref}
    data-testid="content"
    id="content"
    overlayProps={{ 'data-testid': 'overlay' }}
    {...props}
  >
    <DialogCloseButton data-testid="close-button" id="close-button">
      Close me
    </DialogCloseButton>
  </DialogContent>
);
const Wrapper = ({ content, ...props }) => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  return (
    <DialogOpenButton
      ref={buttonRef}
      data-testid="open-button"
      modal={modal(content, contentRef)}
      {...props}
    >
      Open me
    </DialogOpenButton>
  );
};

const dom = { container: document.body };

const open = `
<DocumentFragment>
  <button
    aria-hidden="true"
    data-testid="open-button"
  >
    Open me
  </button>
  <div>
    <div
      data-testid="overlay"
      style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"
    >
      <div
        data-test-id="focus-trap"
      >
        <button
          data-testid="close-button"
          id="close-button"
        >
          Close me
        </button>
      </div>
    </div>
  </div>
</DocumentFragment>
`;

const closed = `
<DocumentFragment>
  <button
    aria-hidden="false"
    data-testid="open-button"
  >
    Open me
  </button>
</DocumentFragment>
`;

test('close button', () => {
  const { asFragment, getByTestId } = render(<Wrapper />, dom);
  const openbutton = getByTestId('open-button');
  fireEvent.click(openbutton);
  expect(asFragment()).toMatchInlineSnapshot(open);

  const closeButton = getByTestId('close-button');
  fireEvent.click(closeButton);
  expect(asFragment()).toMatchInlineSnapshot(closed);
});

test('default overlay click', () => {
  const { asFragment, getByTestId } = render(<Wrapper />, dom);
  const openbutton = getByTestId('open-button');
  fireEvent.click(openbutton);
  expect(asFragment()).toMatchInlineSnapshot(open);

  const overlay = getByTestId('overlay');
  fireEvent.click(overlay);
  expect(asFragment()).toMatchInlineSnapshot(closed);
});

test('overlay click when closeOnOverlayClick is false', () => {
  const { asFragment, getByTestId } = render(
    <Wrapper content={{ closeOnOverlayClick: false }} />,
    dom
  );
  const openbutton = getByTestId('open-button');
  fireEvent.click(openbutton);
  expect(asFragment()).toMatchInlineSnapshot(open);

  const overlay = getByTestId('overlay');
  fireEvent.click(overlay);
  expect(asFragment()).toMatchInlineSnapshot(open);
});

test('focus returns to opening element by default', () => {
  const onFocus = jest.fn();
  const { getByTestId } = render(<Wrapper onFocus={onFocus} />, dom);
  const openbutton = getByTestId('open-button');
  fireEvent.click(openbutton);

  expect(onFocus).not.toHaveBeenCalled();
  const closeButton = getByTestId('close-button');
  fireEvent.click(closeButton);
  expect(onFocus).toHaveBeenCalled();
});

test('focus returns to returnFocus element if given', () => {
  const onFocus = jest.fn();
  const WrapperWithButton = () => {
    const buttonRef = useRef(null);
    return (
      <div>
        <button ref={buttonRef} onFocus={onFocus} />
        <Wrapper returnFocus={buttonRef} />
      </div>
    );
  };
  const { getByTestId } = render(<WrapperWithButton />, dom);
  const openbutton = getByTestId('open-button');
  fireEvent.click(openbutton);

  expect(onFocus).not.toHaveBeenCalled();
  const closeButton = getByTestId('close-button');
  fireEvent.click(closeButton);
  expect(onFocus).toHaveBeenCalled();
});

test('afterClose', () => {
  const afterClose = jest.fn();
  const { getByTestId } = render(<Wrapper afterClose={afterClose} />, dom);
  const openbutton = getByTestId('open-button');
  fireEvent.click(openbutton);

  expect(afterClose).not.toHaveBeenCalled();
  const closeButton = getByTestId('close-button');
  fireEvent.click(closeButton);
  expect(afterClose).toHaveBeenCalled();
});

describe('closeTimeoutDuration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const times = [0, 200];

  [0, 200].forEach(time => {
    test(`${time}`, () => {
      const { asFragment, getByTestId } = render(<Wrapper closeTimeoutDuration={time} />, dom);
      const openbutton = getByTestId('open-button');
      fireEvent.click(openbutton);
      expect(asFragment()).toMatchInlineSnapshot(open);

      const closeButton = getByTestId('close-button');
      fireEvent.click(closeButton);
      expect(asFragment()).toMatchInlineSnapshot(open);
      jest.runAllTimers();
      expect(asFragment()).toMatchInlineSnapshot(closed);
    });
  });
});
