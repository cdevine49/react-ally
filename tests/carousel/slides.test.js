import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Slides } from '../../es/react-ally';

afterEach(cleanup);

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
