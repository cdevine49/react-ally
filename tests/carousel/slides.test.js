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

test('default', () => {
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

test('automatically rotating', () => {
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
