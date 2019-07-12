import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { Slide } from '../../es/react-ally';

afterEach(cleanup);

test('missing required props', () => {
  console.error = jest.fn();
  render(<Slide />);
  const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`Slide\`, but its value is \`undefined\`.
    in Slide`;
  expect(console.error).toHaveBeenCalledWith(message('count'));
  expect(console.error).toHaveBeenCalledWith(message('index'));
  expect(console.error).toHaveBeenCalledTimes(2);
});

test('default', () => {
  const { asFragment } = render(<Slide index={2} count={5} />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-label="2 of 5"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
});

test('aria-label', () => {
  const { asFragment } = render(<Slide aria-label="Hello World" index={2} count={5} />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-label="Hello World"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
});

test('aria-labelledby', () => {
  const { asFragment } = render(<Slide aria-labelledby="helloworld" index={2} count={5} />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-labelledby="helloworld"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
});
