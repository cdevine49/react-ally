import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { DownButton } from '../../src/spin-button';

afterEach(cleanup);

test('passes props', () => {
  const { asFragment } = render(
    <DownButton id="down-button" className="my-class">
      +
    </DownButton>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-hidden="true"
    class="my-class"
    disabled=""
    id="down-button"
    tabindex="-1"
  >
    +
  </button>
</DocumentFragment>
`);
});

describe('non-overrideable props', () => {
  test('aria-hidden', () => {
    const { asFragment } = render(<DownButton aria-hidden={false}>+</DownButton>);
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
    const { asFragment } = render(<DownButton disabled>+</DownButton>);
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
    const { asFragment } = render(<DownButton tabIndex={0}>+</DownButton>);
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
