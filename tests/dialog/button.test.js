import React, { useRef } from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { DialogOpenButton } from '../../src/';

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

const defaultText = 'Click Me';
const Button = ({ children = defaultText, ...props }) => {
  const ref = useRef(null);
  return (
    <DialogOpenButton ref={ref} {...props}>
      {children}
    </DialogOpenButton>
  );
};

const closedDialog = `
<DocumentFragment>
  <button>
    ${defaultText}
  </button>
</DocumentFragment>
`;

test('missing modal', () => {
  const error = `Warning: Failed prop type: The prop \`modal\` is marked as required in \`DialogOpenButton\`, but its value is \`undefined\`.
    in DialogOpenButton (created by Button)
    in Button`;
  const { asFragment, getByText, unmount } = render(<Button />, {
    container: document.body
  });
  expect(console.error).toHaveBeenCalledWith(error);

  expect(asFragment()).toMatchInlineSnapshot(closedDialog);

  fireEvent.click(getByText(defaultText));

  unmount();
});

test('missing ref', () => {
  const component = <DialogOpenButton />;
  expect(() => render(component)).toThrowErrorMatchingInlineSnapshot(
    `"DialogOpenButton requires a ref"`
  );
});

const simpleDiv = <div id="dialog-content" />;
const openWithSimpleDiv = `
<DocumentFragment>
  <button
    aria-hidden="true"
  >
    Click Me
  </button>
  <div>
    <div
      id="dialog-content"
    />
  </div>
</DocumentFragment>
`;

test('opening the content', () => {
  const { asFragment, getByText, unmount } = render(<Button modal={simpleDiv} />, {
    container: document.body
  });

  fireEvent.click(getByText(defaultText));
  expect(asFragment()).toMatchInlineSnapshot(openWithSimpleDiv);

  unmount();
});

test('initializeOpen', () => {
  const component = <Button initializeOpen modal={simpleDiv} />;
  const { asFragment, unmount } = render(component, {
    container: document.body
  });

  // Not sure why this is upside down, but whatever
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <div
      id="dialog-content"
    />
  </div>
  <button
    aria-hidden="true"
  >
    Click Me
  </button>
</DocumentFragment>
`);

  unmount();
});

test('afterOpen', () => {
  const afterOpen = jest.fn();
  const { getByText, unmount } = render(<Button afterOpen={afterOpen} modal={<div />} />, {
    container: document.body
  });

  fireEvent.click(getByText(defaultText));
  expect(afterOpen).toHaveBeenCalledTimes(1);

  unmount();
});
