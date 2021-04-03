import React from 'react';
import { render, screen } from '@testing-library/react';
import { Item } from '../../src/accordion';

test('children are rendered', () => {
  render(
    <Item accordionId="" isOpen multi toggle={jest.fn()} toggleable>
      Child
    </Item>,
  );
  expect(screen.getByText('Child')).toBeInTheDocument();
});

test('children are required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(<Item accordionId="" isOpen multi toggle={jest.fn()} toggleable />);

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `children` is marked as required in `Item`, but its value is `undefined`.',
    expect.any(String),
  );
});
