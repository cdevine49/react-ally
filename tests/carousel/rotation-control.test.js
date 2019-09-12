import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { RotationControl as RotationControlWithoutRequiredProps } from '../../src/carousel';
import { CarouselContext } from '../../src/carousel/context';

afterEach(cleanup);

const RotationControl = React.forwardRef((props, ref) => {
  return (
    <RotationControlWithoutRequiredProps
      ref={ref}
      aria-label={props.children ? undefined : 'Default Label'}
      {...props}
    />
  );
});
const Wrapper = ({ initRotating = false, ...props }) => {
  const [rotating, setRotating] = React.useState(initRotating);
  return (
    <CarouselContext.Provider value={{ rotating, setRotating }}>
      <RotationControl {...props} />
    </CarouselContext.Provider>
  );
};

test('children are required unless aria-label prop is present', () => {
  console.error = jest.fn();

  render(<RotationControlWithoutRequiredProps aria-label="blah" />);
  expect(console.error).toHaveBeenCalledTimes(0);

  render(<RotationControlWithoutRequiredProps>Blah</RotationControlWithoutRequiredProps>);
  expect(console.error).toHaveBeenCalledTimes(0);

  render(<RotationControlWithoutRequiredProps />);

  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    `Warning: Failed prop type: The prop \`children\` is marked as required in \`RotationControl\`, but its value is \`undefined\`.
    in RotationControl`
  );
});

const amIRotating = bool => `Am I rotating? ${bool ? 'Yes!' : 'No!'}`;

describe('When rotating', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <Wrapper initRotating aria-label={amIRotating}>
        {amIRotating}
      </Wrapper>
    );
  });

  test('aria-label function, children function, and aria-pressed all receive true', () => {
    expect(wrapper.asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Am I rotating? Yes!"
    aria-pressed="true"
  >
    Am I rotating? Yes!
  </button>
</DocumentFragment>
`);
  });

  test('click event sets rotating to false', () => {
    fireEvent.click(wrapper.getByText(amIRotating(true)));
    expect(wrapper.asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Am I rotating? No!"
    aria-pressed="false"
  >
    Am I rotating? No!
  </button>
</DocumentFragment>
`);
  });
});

describe('When not rotating', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<Wrapper aria-label={amIRotating}>{amIRotating}</Wrapper>);
  });

  test('aria-label function, children function, and aria-pressed all receive false', () => {
    expect(wrapper.asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Am I rotating? No!"
    aria-pressed="false"
  >
    Am I rotating? No!
  </button>
</DocumentFragment>
`);
  });

  test('click event sets rotating to true', () => {
    fireEvent.click(wrapper.getByText(amIRotating(false)));
    expect(wrapper.asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Am I rotating? Yes!"
    aria-pressed="true"
  >
    Am I rotating? Yes!
  </button>
</DocumentFragment>
`);
  });
});

test('children render normally when not a function', () => {
  const { asFragment } = render(
    <RotationControl aria-label={undefined}>Hello World</RotationControl>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button>
    Hello World
  </button>
</DocumentFragment>
`);
});

test('aria-label renders normally when not a function', () => {
  const { asFragment } = render(<RotationControl aria-label="Hello World" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Hello World"
  />
</DocumentFragment>
`);
});

test('onClick cannot be overridden', () => {
  console.error = jest.fn();
  const onClick = jest.fn();
  const setRotating = jest.fn();
  const testid = 'rc-testid';
  const { getByTestId } = render(
    <CarouselContext.Provider value={{ setRotating }}>
      <RotationControl data-testid={testid} onClick={onClick} />
    </CarouselContext.Provider>
  );
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: \`RotationControl\` has a default \`onClick\` prop of value \`a function that toggles rotation\` that cannot be overridden.
    in RotationControl (created by ForwardRef)
    in ForwardRef`);
  expect(setRotating).not.toHaveBeenCalled();
  fireEvent.click(getByTestId(testid));
  expect(onClick).not.toHaveBeenCalled();
  expect(setRotating).toHaveBeenCalledTimes(1);
});

test('aria-pressed cannot be overridden', () => {
  const { asFragment } = render(
    <RotationControl aria-pressed={false}>Hello World</RotationControl>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button>
    Hello World
  </button>
</DocumentFragment>
`);
});

test('props other than "aria-pressed" and "onClick" can be added', () => {
  const { asFragment } = render(<RotationControl id="hello-world" className="goodbye-moon" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Default Label"
    class="goodbye-moon"
    id="hello-world"
  />
</DocumentFragment>
`);
});

test('can accept a ref', () => {
  const func = jest.fn();
  const testid = 'rc-testid';
  const Component = () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      func(ref.current);
    });
    return <RotationControl ref={ref} data-testid={testid} />;
  };

  const { getByTestId } = render(<Component />);
  expect(func).toHaveBeenCalledTimes(1);
  expect(func).not.toHaveBeenCalledWith(null);
  expect(func).toHaveBeenCalledWith(getByTestId(testid));
});
