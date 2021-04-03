import React from 'react';
import { render, screen } from '@testing-library/react';
import { Panel } from '../../src/accordion';

test('children are required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(<Panel />);

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `children` is marked as required in `Panel`, but its value is `undefined`.',
    expect.any(String),
  );
});

test('HTML attribute props are spread on the region', () => {
  const id = 'heading-el';
  const className = 'red';
  render(<Panel className={className} id={id} />);

  const panel = screen.getByRole('region', { hidden: true });
  expect(panel).toHaveAttribute('class', className);
  expect(panel).not.toHaveAttribute('id', id);
});

test('aria-hidden attribute on the region element cannot be overridden', () => {
  render(<Panel aria-hidden={false}>Child</Panel>);
  expect(screen.getByRole('region', { hidden: true })).not.toHaveAttribute(
    'aria-hidden',
    'false',
  );
});

test('aria-labelledby attribute on the region element cannot be overridden', () => {
  render(<Panel aria-labelledby="my-label">Child</Panel>);
  expect(screen.getByRole('region', { hidden: true })).not.toHaveAttribute(
    'aria-labelledby',
    'my-label',
  );
});

test('id attribute on the region element cannot be overridden', () => {
  render(<Panel id="myself">Child</Panel>);
  expect(screen.getByRole('region', { hidden: true })).not.toHaveAttribute(
    'id',
    'myself',
  );
});

test('Passes ref to the region element', () => {
  const ref = React.createRef();
  render(<Panel ref={ref} />);
  expect(screen.getByRole('region', { hidden: true })).toBe(ref.current);
});
