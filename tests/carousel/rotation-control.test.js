import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { RotationControl } from '../../src/carousel';
import * as context from '../../src/carousel/context';

afterEach(cleanup);

const setContext = ctx => {
  jest.spyOn(context, 'useCarouselContext').mockImplementation(() => ctx);
};

beforeEach(() => {
  setContext({ rotating: false });
});

test('missing required props', () => {
  console.error = jest.fn();
  render(<RotationControl />);
  const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`RotationControl\`, but its value is \`undefined\`.
    in RotationControl`;
  expect(console.error).toHaveBeenCalledWith(message('rotating'));
  expect(console.error).toHaveBeenCalledWith(message('setRotating'));
  expect(console.error).toHaveBeenCalledTimes(2);
});

test('default', () => {
  const { asFragment } = render(<RotationControl />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
  />
</DocumentFragment>
`);
});

test('children', () => {
  const { asFragment } = render(<RotationControl>Hello World</RotationControl>);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
  >
    Hello World
  </button>
</DocumentFragment>
`);
});

test('rotating', () => {
  setContext({ rotating: true });
  const { asFragment, rerender } = render(<RotationControl />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="true"
  />
</DocumentFragment>
`);

  setContext({ rotating: false });
  rerender(<RotationControl />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
  />
</DocumentFragment>
`);
});

test('setRotating', () => {
  const setRotating = jest.fn();
  setContext({ rotating: false, setRotating });
  const { asFragment, getByText } = render(<RotationControl>Hello World</RotationControl>);

  fireEvent.click(getByText('Hello World'));
  expect(setRotating).toHaveBeenCalledTimes(1);

  setContext({ rotating: true, setRotating });
  fireEvent.click(getByText('Hello World'));
  expect(setRotating).toHaveBeenCalledTimes(2);
});

test('addable props', () => {
  const { asFragment } = render(<RotationControl id="hello-world" className="goodbye-moon" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
    class="goodbye-moon"
    id="hello-world"
  />
</DocumentFragment>
`);
});

test('non-addable props', () => {
  const setRotating = jest.fn();
  setContext({ rotating: true, setRotating });
  const onClick = jest.fn();
  const { asFragment, getByText } = render(
    <RotationControl aria-pressed={false} onClick={onClick}>
      Hello World
    </RotationControl>
  );
  fireEvent.click(getByText('Hello World'));
  expect(onClick).not.toHaveBeenCalled();
  expect(setRotating).toHaveBeenCalled();
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="true"
  >
    Hello World
  </button>
</DocumentFragment>
`);
});
