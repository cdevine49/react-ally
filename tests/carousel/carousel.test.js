import React, { useState } from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Carousel, PreviousSlideControl, RotationControl } from '../../src/carousel';

afterEach(cleanup);

test('missing required props', () => {
  console.error = jest.fn();
  render(<Carousel aria-labelledby="id" />);
  const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`Carousel\`, but its value is \`undefined\`.
    in Carousel`;
  expect(console.error).toHaveBeenCalledWith(message('role'));
  expect(console.error).toHaveBeenCalledTimes(1);

  render(<Carousel />);
  expect(console.error).toHaveBeenCalledWith(message('aria-label'));
  expect(console.error).toHaveBeenCalledTimes(2);
});

test('incorrect prop types', () => {
  console.error = jest.fn();
  render(<Carousel role="not_group_or_region" />);
  const message = prop => `Warning: Failed prop type: Invalid prop \`${prop}\` of value \`not_group_or_region\` supplied to \`Carousel\`, expected one of ["group, region"].
    in Carousel`;
  expect(console.error).toHaveBeenCalledWith(message('role'));
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('children', () => {
  const { asFragment } = render(
    <Carousel index={1} count={2}>
      <ul>
        <li>One</li>
        <li>Two</li>
      </ul>
    </Carousel>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-roledescription="carousel"
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

const Component = () => {
  const [rotating, setRotating] = useState(false);
  const rcText = rotating ? 'Stop' : 'Start';
  return (
    <Carousel rotating={rotating} setRotating={setRotating}>
      <RotationControl>{rcText}</RotationControl>
    </Carousel>
  );
};

test('clicking rotation control', () => {
  const { asFragment, getByText } = render(<Component />);
  fireEvent.click(getByText('Start'));
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-roledescription="carousel"
  >
    <button
      aria-pressed="true"
    >
      Stop
    </button>
  </div>
</DocumentFragment>
`);
  fireEvent.click(getByText('Stop'));
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-roledescription="carousel"
  >
    <button
      aria-pressed="false"
    >
      Start
    </button>
  </div>
</DocumentFragment>
`);
});
