import React from 'react';
import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Header } from '../../src/accordion';

test('children are rendered inside button element', () => {
  render(<Header>Child</Header>);
  const button = screen.getByRole('button');
  expect(within(button).getByText('Child')).toBeInTheDocument();
});

test('children are required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(<Header />);

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `children` is marked as required in `Header`, but its value is `undefined`.',
    expect.any(String),
  );
});

test('buttonProps are spread over the button element', () => {
  const id = 'heading-el';
  const className = 'red';
  render(<Header buttonProps={{ className, id }} />);

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('class', className);
  expect(button).not.toHaveAttribute('id', id);
});

test('aria-disabled attribute on the button element cannot be overridden', () => {
  render(<Header buttonProps={{ 'aria-disabled': false }}>Child</Header>);
  expect(screen.getByRole('button')).not.toHaveAttribute(
    'aria-disabled',
    'false',
  );
});

test('aria-expanded attribute on the button element cannot be overridden', () => {
  render(<Header buttonProps={{ 'aria-expanded': false }}>Child</Header>);
  expect(screen.getByRole('button')).not.toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('aria-controls attribute on the button element cannot be overridden', () => {
  render(
    <Header buttonProps={{ 'aria-controls': 'my-controlled-component' }}>
      Child
    </Header>,
  );
  expect(screen.getByRole('button')).not.toHaveAttribute(
    'aria-controls',
    'my-controlled-component',
  );
});

test('id attribute on the button element cannot be overridden', () => {
  render(<Header buttonProps={{ id: 'myself' }}>Child</Header>);
  expect(screen.getByRole('button')).not.toHaveAttribute('id', 'myself');
});

test('onClick handler on the button element cannot be overridden', () => {
  const onClick = jest.fn();
  render(<Header buttonProps={{ onClick }}>Child</Header>);
  user.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
});

test('onKeyDown handler on the button element cannot be overridden', () => {
  const onKeyDown = jest.fn();
  render(<Header buttonProps={{ onKeyDown }}>Child</Header>);
  user.type(screen.getByRole('button'), 'a');
  expect(onKeyDown).not.toHaveBeenCalled();
});

test('HTML attribute props are spread on the heading', () => {
  const id = 'heading-el';
  const className = 'red';
  render(
    <Header className={className} id={id}>
      Child
    </Header>,
  );

  const heading = screen.getByRole('heading');
  expect(heading).toHaveAttribute('class', className);
  expect(heading).toHaveAttribute('id', id);
});

test('Passes ref to the heading element', () => {
  const ref = React.createRef();
  render(<Header ref={ref}>Child</Header>);
  expect(screen.getByRole('heading')).toBe(ref.current);
});
