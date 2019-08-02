import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Slide } from '../../src/carousel';

afterEach(cleanup);

const requiredProps = { count: 5, index: 2 };
// Has to go first because of how prop-types works
describe('Accessible Name', () => {
  test('aria-labelledby with aria-label', () => {
    const { asFragment } = render(
      <Slide {...requiredProps} aria-label="label" aria-labelledby="elementId" />
    );
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <li
    aria-label="label"
    aria-labelledby="elementId"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
  });

  test('aria-labelledby without aria-label', () => {
    const { asFragment } = render(<Slide {...requiredProps} aria-labelledby="elementId" />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <li
    aria-labelledby="elementId"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
  });

  test('aria-label without aria-labelledby', () => {
    const { asFragment } = render(<Slide {...requiredProps} aria-label="label" />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <li
    aria-label="label"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
  });

  test('neither aria-label nor aria-labelledby', () => {
    console.error = jest.fn();
    render(<Slide />);
    const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`Slide\`, but its value is \`undefined\`.
    in Slide`;
    expect(console.error).toHaveBeenCalledWith(message('count'));
    expect(console.error).toHaveBeenCalledWith(message('index'));
    expect(console.error).toHaveBeenCalledTimes(2);

    const { asFragment } = render(<Slide {...requiredProps} />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <li
    aria-label="2 of 5"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
  });
});

const _default = `
<DocumentFragment>
  <li
    aria-label="undefined of undefined"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`;

test('default', () => {
  const { asFragment } = render(<Slide />);
  expect(asFragment()).toMatchInlineSnapshot(_default);
});

const failedOverrideMessage = (
  prop,
  expected
) => `Warning: Failed prop type: \`Slide\` has a default \`${prop}\` prop of value \`${expected}\` that cannot be overridden.
    in Slide`;

test('overriding aria-roledescription', () => {
  console.error = jest.fn();
  const { asFragment } = render(<Slide aria-roledescription="invalid" />);
  expect(console.error).toHaveBeenCalledWith(
    failedOverrideMessage('aria-roledescription', 'slide')
  );
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(asFragment()).toMatchInlineSnapshot(_default);
});

test('overriding role', () => {
  console.error = jest.fn();
  const { asFragment } = render(<Slide role="invalid" />);
  expect(console.error).toHaveBeenCalledWith(failedOverrideMessage('role', 'group'));
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(asFragment()).toMatchInlineSnapshot(_default);
});

test('children', () => {
  const { asFragment } = render(
    <Slide index={2} count={5}>
      <img src="whatever" />
    </Slide>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <li
    aria-label="2 of 5"
    aria-roledescription="slide"
    role="group"
  >
    <img
      src="whatever"
    />
  </li>
</DocumentFragment>
`);
});
