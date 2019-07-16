import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Carousel } from '../../es/react-ally';

afterEach(cleanup);

test('missing required props', () => {
  console.error = jest.fn();
  render(<Carousel />);
  const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`Carousel\`, but its value is \`undefined\`.
    in Carousel`;
  expect(console.error).toHaveBeenCalledWith(message('aria-label'));
  expect(console.error).toHaveBeenCalledWith(message('role'));
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
      {/*  */}
    </Carousel>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    aria-roledescription="carousel"
  />
</DocumentFragment>
`);
});
