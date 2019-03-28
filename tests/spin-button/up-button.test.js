import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { UpButton } from '../../src/spin-button';

afterEach(cleanup);

test('passes props', () => {
  const { asFragment } = render(
    <UpButton id="up-button" className="my-class">
      +
    </UpButton>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-hidden="true"
    class="my-class"
    disabled=""
    id="up-button"
    tabindex="-1"
  >
    +
  </button>
</DocumentFragment>
`);
});

describe('non-overrideable props', () => {
  test('aria-hidden', () => {
    const { asFragment } = render(<UpButton aria-hidden={false}>+</UpButton>);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-hidden="true"
    disabled=""
    tabindex="-1"
  >
    +
  </button>
</DocumentFragment>
`);
  });

  test('disabled', () => {
    const { asFragment } = render(<UpButton disabled>+</UpButton>);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-hidden="true"
    disabled=""
    tabindex="-1"
  >
    +
  </button>
</DocumentFragment>
`);
  });

  test('tabIndex', () => {
    const { asFragment } = render(<UpButton tabIndex={0}>+</UpButton>);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-hidden="true"
    disabled=""
    tabindex="-1"
  >
    +
  </button>
</DocumentFragment>
`);
  });
});
