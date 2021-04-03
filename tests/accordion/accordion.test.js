import React from 'react';
import { render } from '@testing-library/react';
import { Accordion } from '../../src/accordion';

test('children are required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(<Accordion id="my-accordion" />);

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `children` is marked as required in `Accordion`, but its value is `undefined`.',
    expect.any(String),
  );
});

test('id is required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(
    <Accordion>
      <div />
    </Accordion>,
  );

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `id` is marked as required in `Accordion`, but its value is `undefined`.',
    expect.any(String),
  );
});

test('cannot receive multi of false and initialOpen of all', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(
    <Accordion id="my-accordion" initialOpen="all" multi={false}>
      <div />
    </Accordion>,
  );

  expect(consoleError).toHaveBeenCalledWith(
    'Cannot use multi={false} with initialOpen="all"',
  );
});
