import React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from '../../src/breadcrumb';

test("href prop is added to the link element's attributes", () => {
  const href = 'www.example.com';
  render(<Breadcrumb href={href}>Page</Breadcrumb>);

  expect(screen.getByRole('link')).toHaveAttribute('href', href);
});

test('the link element prefers the href prop to href in linkProps', () => {
  const href = 'www.example.com';
  const linkPropsHref = 'www.other-site.com';
  render(
    <Breadcrumb href={href} linkProps={{ href: linkPropsHref }}>
      Page
    </Breadcrumb>,
  );

  expect(screen.getByRole('link')).toHaveAttribute('href', href);
});

test('linkProps are spread over the link element', () => {
  const id = 'my-id';
  const className = 'red';
  render(
    <Breadcrumb href="" linkProps={{ className, id }}>
      Page
    </Breadcrumb>,
  );

  expect(screen.getByRole('link')).toHaveAttribute('class', className);
  expect(screen.getByRole('link')).toHaveAttribute('id', id);
});

test('HTML listitem attribute props are spread on the listitem', () => {
  const id = 'my-id';
  const className = 'red';
  render(
    <Breadcrumb className={className} id={id} href="">
      Page
    </Breadcrumb>,
  );

  expect(screen.getByRole('listitem')).toHaveAttribute('class', className);
  expect(screen.getByRole('listitem')).toHaveAttribute('id', id);
});

test('children are required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(<Breadcrumb href="" />);

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `children` is marked as required in `Breadcrumb`, but its value is `undefined`.',
    expect.any(String),
  );
});

test('href is required', () => {
  const consoleError = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  render(<Breadcrumb>Page</Breadcrumb>);

  expect(consoleError).toHaveBeenCalledWith(
    expect.any(String),
    expect.any(String),
    'The prop `href` is marked as required in `Breadcrumb`, but its value is `undefined`.',
    expect.any(String),
  );
});
