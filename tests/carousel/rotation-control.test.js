import React, { useState } from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { RotationControl } from '../../es/react-ally';

afterEach(cleanup);

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
  <button />
</DocumentFragment>
`);
});

test('children', () => {
  const { asFragment } = render(<RotationControl>Hello World</RotationControl>);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button>
    Hello World
  </button>
</DocumentFragment>
`);
});

const Component = () => {};

test('rotating', () => {
  const { asFragment, rerender } = render(<RotationControl rotating />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="true"
  />
</DocumentFragment>
`);
  rerender(<RotationControl rotating={false} />);
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
  const { getByText } = render(
    <RotationControl setRotating={setRotating}>Hello World</RotationControl>
  );
  fireEvent.click(getByText('Hello World'));
  expect(setRotating).toHaveBeenCalledTimes(1);
});

test('addable props', () => {
  const { asFragment } = render(<RotationControl id="hello-world" className="goodbye-moon" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    class="goodbye-moon"
    id="hello-world"
  />
</DocumentFragment>
`);
});

test('non-addable props', () => {
  const onClick = jest.fn();
  const { asFragment, getByText } = render(
    <RotationControl aria-pressed={false} rotating onClick={onClick} setRotating={() => {}}>
      Hello World
    </RotationControl>
  );
  fireEvent.click(getByText('Hello World'));
  expect(onClick).not.toHaveBeenCalled();
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
