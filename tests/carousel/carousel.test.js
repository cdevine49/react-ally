import React, { useState } from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import {
  Carousel as CarouselWithoutRequiredProps,
  PreviousSlideControl,
  RotationControl
} from '../../src/carousel';
import { useCarouselContext } from '../../src/carousel/context';

afterEach(cleanup);

const Carousel = React.forwardRef((props, ref) => {
  return (
    <CarouselWithoutRequiredProps
      ref={ref}
      aria-label={props['aria-labelledby'] ? undefined : 'Default Label'}
      role="group"
      {...props}
    />
  );
});

Carousel.displayName = 'CarouselWrapper';

test('can accept a ref', () => {
  const func = jest.fn();
  const testid = 'carousel-testid';
  const Component = () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      func(ref.current);
    });
    return <Carousel ref={ref} data-testid={testid} />;
  };

  const { getByTestId } = render(<Component />);
  expect(func).toHaveBeenCalledTimes(1);
  expect(func).not.toHaveBeenCalledWith(null);
  expect(func).toHaveBeenCalledWith(getByTestId(testid));
});

test('aria-label prop is required unless aria-labelledby prop is present', () => {
  console.error = jest.fn();

  render(<Carousel />);
  expect(console.error).not.toHaveBeenCalled();

  render(<Carousel aria-label={undefined} aria-labelledby="#blah" />);
  expect(console.error).toHaveBeenCalledTimes(0);

  render(<Carousel aria-label={undefined} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    `Warning: Failed prop type: The prop \`aria-label\` is marked as required in \`Carousel\`, but its value is \`undefined\`.
    in Carousel (created by CarouselWrapper)
    in CarouselWrapper`
  );
});

test('aria-roledescription prop cannot override default', () => {
  console.error = jest.fn();

  render(<Carousel />);
  expect(console.error).not.toHaveBeenCalled();

  render(<Carousel aria-roledescription="blah" />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: \`Carousel\` has a default \`aria-roledescription\` prop of value \`carousel\` that cannot be overridden.
    in Carousel (created by CarouselWrapper)
    in CarouselWrapper`);
});

test('role prop is required', () => {
  console.error = jest.fn();

  render(<Carousel />);
  expect(console.error).not.toHaveBeenCalled();

  render(<Carousel role={undefined} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    `Warning: Failed prop type: The prop \`role\` is marked as required in \`Carousel\`, but its value is \`undefined\`.
    in Carousel (created by CarouselWrapper)
    in CarouselWrapper`
  );
});

test('role prop must be either "group" or "region"', () => {
  console.error = jest.fn();

  render(<Carousel />);
  expect(console.error).not.toHaveBeenCalled();

  render(<Carousel role="blah" />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    `Warning: Failed prop type: Invalid prop \`role\` of value \`blah\` supplied to \`Carousel\`, expected one of [\"group\",\"region\"].
    in Carousel (created by CarouselWrapper)
    in CarouselWrapper`
  );
});

test('rotating prop must be a boolean', () => {
  console.error = jest.fn();

  render(<Carousel />);
  expect(console.error).not.toHaveBeenCalled();

  render(<Carousel rotating="blah" />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    `Warning: Failed prop type: Invalid prop \`rotating\` of type \`string\` supplied to \`Carousel\`, expected \`boolean\`.
    in Carousel (created by CarouselWrapper)
    in CarouselWrapper`
  );
});

test('setRotating prop must be a function', () => {
  console.error = jest.fn();

  render(<Carousel />);
  expect(console.error).not.toHaveBeenCalled();

  render(<Carousel setRotating="blah" />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    `Warning: Failed prop type: Invalid prop \`setRotating\` of type \`string\` supplied to \`Carousel\`, expected \`function\`.
    in Carousel (created by CarouselWrapper)
    in CarouselWrapper`
  );
});

test("props other than 'aria-roledescription' can be added to the wrapping element", () => {
  const { asFragment } = render(
    <Carousel id="my-id" className="hello-world" data-event="Some event name" />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-label="Default Label"
    aria-roledescription="carousel"
    class="hello-world"
    data-event="Some event name"
    id="my-id"
    role="group"
  />
</DocumentFragment>
`);
});

test('children are given to the wrapping element', () => {
  const { asFragment } = render(
    <Carousel>
      <ul>
        <li>One</li>
        <li>Two</li>
      </ul>
    </Carousel>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-label="Default Label"
    aria-roledescription="carousel"
    role="group"
  >
    <ul>
      <li>
        One
      </li>
      <li>
        Two
      </li>
    </ul>
  </div>
</DocumentFragment>
`);
});

test('children have access to rotating and setRotating through context', () => {
  const setRotating = jest.fn();
  const Child = () => {
    const { rotating, setRotating } = useCarouselContext();
    return <button onClick={setRotating}>{rotating ? "I'm rotating" : "I'm still"}</button>;
  };
  const { asFragment, getByText } = render(
    <Carousel rotating={true} setRotating={setRotating}>
      <Child />
    </Carousel>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-label="Default Label"
    aria-roledescription="carousel"
    role="group"
  >
    <button>
      I'm rotating
    </button>
  </div>
</DocumentFragment>
`);
  expect(setRotating).not.toHaveBeenCalled();
  fireEvent.click(getByText("I'm rotating"));
  expect(setRotating).toHaveBeenCalledTimes(1);
});

const Component = () => {
  const [rotating, setRotating] = useState(false);
  const rcText = rotating ? 'Stop' : 'Start';
  return (
    <Carousel rotating={rotating} setRotating={setRotating}>
      <RotationControl>{rcText}</RotationControl>
    </Carousel>
  );
};

test('rotating prop defaults to false', () => {
  const setRotating = jest.fn();
  const Child = () => {
    const { rotating, setRotating } = useCarouselContext();
    return <button onClick={setRotating}>{rotating ? "I'm rotating" : "I'm still"}</button>;
  };
  const { asFragment, getByText } = render(
    <Carousel setRotating={setRotating}>
      <Child />
    </Carousel>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-label="Default Label"
    aria-roledescription="carousel"
    role="group"
  >
    <button>
      I'm still
    </button>
  </div>
</DocumentFragment>
`);
});

// test('clicking rotation control', () => {
//   const { asFragment, getByText } = render(<Component />);
//   fireEvent.click(getByText('Start'));
//   expect(asFragment()).toMatchInlineSnapshot(`
// <DocumentFragment>
//   <div
//     aria-roledescription="carousel"
//   >
//     <button
//       aria-pressed="true"
//     >
//       Stop
//     </button>
//   </div>
// </DocumentFragment>
// `);
//   fireEvent.click(getByText('Stop'));
//   expect(asFragment()).toMatchInlineSnapshot(`
// <DocumentFragment>
//   <div
//     aria-roledescription="carousel"
//   >
//     <button
//       aria-pressed="false"
//     >
//       Start
//     </button>
//   </div>
// </DocumentFragment>
// `);
// });
