import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Trail } from '../../src/breadcrumb';

test('children are rendered inside list element', () => {
	render(<Trail><li /></Trail>);
	const ol = screen.getByRole('list');
	expect(within(ol).getByRole('listitem')).toBeInTheDocument();
});

test('listProps are spread over the list element', () => {
  const id = 'my-id';
  const className = 'red';
  render(
    <Trail listProps={{ className, id }}>
      <li />
    </Trail>,
  );

  expect(screen.getByRole('list')).toHaveAttribute('class', className);
  expect(screen.getByRole('list')).toHaveAttribute('id', id);
});

test('HTML props are spread on the navigation element', () => {
  const id = 'my-id';
  const className = 'red';
  render(
    <Trail className={className} id={id}>
      <li />
    </Trail>,
  );

  expect(screen.getByRole('navigation')).toHaveAttribute('class', className);
  expect(screen.getByRole('navigation')).toHaveAttribute('id', id);
});

test('aria-label attribute on the navigation element can be overridden', () => {
	render(<Trail aria-label="Something else"><li /></Trail>);
	expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Something else');
});
