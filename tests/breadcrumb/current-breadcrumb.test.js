import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrentBreadcrumb } from '../../src/breadcrumb';

test('When the link prop is true, the implementation includes a link to the current page', () => {
  render(<CurrentBreadcrumb link={true}>This Page</CurrentBreadcrumb>);

  expect(screen.getByRole('link')).toBeInTheDocument();
  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    window.location.href,
  );
});

test('When the link prop is false, the implementation includes no link', () => {
  render(<CurrentBreadcrumb link={false}>This Page</CurrentBreadcrumb>);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('By default, the implementation includes no link', () => {
  render(<CurrentBreadcrumb>This Page</CurrentBreadcrumb>);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('linkProps are spread over the link element if present', () => {
  const id = 'my-id';
  const className = 'red';
  render(
    <CurrentBreadcrumb linkProps={{ className, id }} link>
      This Page
    </CurrentBreadcrumb>,
  );

  expect(screen.getByRole('link')).toHaveAttribute('class', className);
  expect(screen.getByRole('link')).toHaveAttribute('id', id);
});

test('aria-current in linkProps is ignored', () => {
  render(
    <CurrentBreadcrumb linkProps={{ 'aria-current': 'blah' }} link>
      This Page
    </CurrentBreadcrumb>,
  );
  expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
});

test('href in linkProps is ignored', () => {
  render(
    <CurrentBreadcrumb linkProps={{ href: 'www.blah.com' }} link>
      This Page
    </CurrentBreadcrumb>,
  );
  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    window.location.href,
  );
});

test('HTML listitem attribute props are spread on the listitem', () => {
  const id = 'my-id';
  const className = 'red';
  render(
    <CurrentBreadcrumb className={className} id={id}>
      This Page
    </CurrentBreadcrumb>,
  );

  expect(screen.getByRole('listitem')).toHaveAttribute('class', className);
  expect(screen.getByRole('listitem')).toHaveAttribute('id', id);
});

test('children are required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(<CurrentBreadcrumb />);

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `children` is marked as required in `CurrentBreadcrumb`, but its value is `undefined`.',
    expect.any(String),
  );
});
