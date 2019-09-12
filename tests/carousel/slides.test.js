import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Slides } from '../../src/carousel';
import * as context from '../../src/carousel/context';

afterEach(cleanup);

const setRotating = rotating =>
  jest.spyOn(context, 'useCarouselContext').mockImplementation(() => ({
    rotating
  }));

const failedOverrideMessage = (
  prop,
  expected
) => `Warning: Failed prop type: \`Slides\` has a default \`${prop}\` prop of value \`${expected}\` that cannot be overridden.
    in Slides`;

const _default = rotating => `
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="${rotating ? 'off' : 'polite'}"
  />
</DocumentFragment>
`;

const ariaAtomicCannotBeOverridden = bool => {};

const ariaLiveCannotBeOverridden = bool => {};

describe('When rotating', () => {
  beforeEach(() => {
    setRotating(true);
  });

  test('renders ul with default aria-atomic="off" aria-live="false"', () => {
    const { asFragment } = render(<Slides />);
    expect(asFragment()).toMatchInlineSnapshot(_default(true));
  });
});

describe('When not rotating', () => {
  const _default = rotating => `
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="polite"
  />
</DocumentFragment>
`;

  beforeEach(() => {
    setRotating(false);
  });

  test('renders ul with default aria-atomic="polite" aria-live="false"', () => {
    const { asFragment } = render(<Slides />);
    expect(asFragment()).toMatchInlineSnapshot(_default(true));
  });
});

test('aria-atomic cannot be overridden', () => {
  setRotating(true);
  console.error = jest.fn();
  const { asFragment } = render(<Slides aria-atomic />);
  expect(console.error).toHaveBeenCalledWith(failedOverrideMessage('aria-atomic', false));
  expect(console.error).toHaveBeenCalledTimes(1);

  expect(asFragment()).toMatchInlineSnapshot(_default(true));
});

test('aria-live cannot be overridden', () => {
  setRotating(false);
  console.error = jest.fn();
  const { asFragment } = render(<Slides aria-live />);
  expect(console.error).toHaveBeenCalledWith(
    failedOverrideMessage('aria-live', 'off if rotating or polite if not rotating')
  );
  expect(console.error).toHaveBeenCalledTimes(1);

  expect(asFragment()).toMatchInlineSnapshot(_default(false));
});

test('accepts children', () => {
  const FakeSlide = props => (
    <li>
      {props.index + 1} of {props.count}
    </li>
  );
  const { asFragment } = render(
    <Slides>
      <FakeSlide />
      <FakeSlide />
      <FakeSlide />
    </Slides>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="polite"
  >
    <li>
      1 of 3
    </li>
    <li>
      2 of 3
    </li>
    <li>
      3 of 3
    </li>
  </ul>
</DocumentFragment>
`);
});

test('accepts other props', () => {
  const { asFragment } = render(<Slides id="my-id" className="red large" data-name="Some name" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <ul
    aria-atomic="false"
    aria-live="polite"
    class="red large"
    data-name="Some name"
    id="my-id"
  />
</DocumentFragment>
`);
});

test('accepts ref', () => {
  const func = jest.fn();
  const testid = 'slide-testid';
  const Component = () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      func(ref.current);
    });
    return <Slides ref={ref} data-testid={testid} />;
  };

  const { getByTestId } = render(<Component />);
  expect(func).toHaveBeenCalledTimes(1);
  expect(func).not.toHaveBeenCalledWith(null);
  expect(func).toHaveBeenCalledWith(getByTestId(testid));
});
