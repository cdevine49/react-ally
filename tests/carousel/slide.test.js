import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Slide as SlideWithoutRequiredProps } from '../../src/carousel';

afterEach(cleanup);

test('count and index props are required', () => {
  console.error = jest.fn();
  const { asFragment } = render(<SlideWithoutRequiredProps />);
  const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`Slide\`, but its value is \`undefined\`.
    in Slide`;
  expect(console.error).toHaveBeenCalledWith(message('count'));
  expect(console.error).toHaveBeenCalledWith(message('index'));
  expect(console.error).toHaveBeenCalledTimes(2);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <li
    aria-label="undefined of undefined"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`);
});

const requiredProps = { count: 5, index: 2 };
const Slide = React.forwardRef((props, ref) => (
  <SlideWithoutRequiredProps ref={ref} {...requiredProps} {...props} />
));

const _default = `
<DocumentFragment>
  <li
    aria-label="${requiredProps.index} of ${requiredProps.count}"
    aria-roledescription="slide"
    role="group"
  />
</DocumentFragment>
`;

test('renders with default aria-label "${index} of ${count}", aria-roledescription "slide", and role "group"', () => {
  const { asFragment } = render(<Slide />);
  expect(asFragment()).toMatchInlineSnapshot(_default);
});

test('aria-label prop overrides default aria-label', () => {
  const { asFragment } = render(<Slide aria-label="label" />);
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

test('aria-labelledby prop removes default aria-label', () => {
  const { asFragment } = render(<Slide aria-labelledby="elementId" />);
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

test('aria-labelledby prop neither overrides nor removes aria-label prop', () => {
  const { asFragment } = render(<Slide aria-label="label" aria-labelledby="elementId" />);
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

const failedOverrideMessage = (
  prop,
  expected
) => `Warning: Failed prop type: \`Slide\` has a default \`${prop}\` prop of value \`${expected}\` that cannot be overridden.
    in Slide (created by ForwardRef)
    in ForwardRef`;

test('cannot override aria-roledescription', () => {
  console.error = jest.fn();
  const { asFragment } = render(<Slide aria-roledescription="invalid" />);
  expect(console.error).toHaveBeenCalledWith(
    failedOverrideMessage('aria-roledescription', 'slide')
  );
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(asFragment()).toMatchInlineSnapshot(_default);
});

test('cannot override role', () => {
  console.error = jest.fn();
  const { asFragment } = render(<Slide role="invalid" />);
  expect(console.error).toHaveBeenCalledWith(failedOverrideMessage('role', 'group'));
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(asFragment()).toMatchInlineSnapshot(_default);
});

test('accepts children', () => {
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

test('accepts other props', () => {
  const { asFragment } = render(<Slide id="my-id" className="red large" data-name="Some name" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <li
    aria-label="2 of 5"
    aria-roledescription="slide"
    class="red large"
    data-name="Some name"
    id="my-id"
    role="group"
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
    return <Slide ref={ref} data-testid={testid} />;
  };

  const { getByTestId } = render(<Component />);
  expect(func).toHaveBeenCalledTimes(1);
  expect(func).not.toHaveBeenCalledWith(null);
  expect(func).toHaveBeenCalledWith(getByTestId(testid));
});
