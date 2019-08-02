import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Slides } from '../../src/carousel';
import * as context from '../../src/carousel/context';

afterEach(cleanup);

const setRotating = rotating =>
  jest.spyOn(context, 'useCarouselContext').mockImplementation(() => ({
    rotating
  }));

beforeEach(() => {
  setRotating(false);
});

describe('Aria-live', () => {
  test('when rotating', () => {
    setRotating(true);
    const { asFragment } = render(<Slides />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="off"
  />
</DocumentFragment>
`);
  });

  test('when not rotating', () => {
    setRotating(false);
    const { asFragment } = render(<Slides />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="polite"
  />
</DocumentFragment>
`);
  });
});

const failedOverrideMessage = (
  prop,
  expected
) => `Warning: Failed prop type: \`Slides\` has a default \`${prop}\` prop of value \`${expected}\` that cannot be overridden.
    in Slides`;

test('overriding aria-atomic', () => {
  console.error = jest.fn();
  const { asFragment } = render(<Slides aria-atomic />);
  expect(console.error).toHaveBeenCalledWith(failedOverrideMessage('aria-atomic', false));
  expect(console.error).toHaveBeenCalledTimes(1);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="polite"
  />
</DocumentFragment>
`);
});

test('overriding aria-live', () => {
  console.error = jest.fn();
  const { asFragment } = render(<Slides aria-live />);
  expect(console.error).toHaveBeenCalledWith(
    failedOverrideMessage('aria-live', 'off if rotating or polite if not rotating')
  );
  expect(console.error).toHaveBeenCalledTimes(1);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="polite"
  />
</DocumentFragment>
`);
});

test('children', () => {
  const { asFragment } = render(
    <Slides>
      <li>One</li>
      <li>Two</li>
    </Slides>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="polite"
  >
    <li>
      One
    </li>
    <li>
      Two
    </li>
  </ul>
</DocumentFragment>
`);
});
