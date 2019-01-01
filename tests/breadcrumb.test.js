import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Breadcrumb, BreadcrumbLink } from '../es/react-ally.js';

afterEach(cleanup);

test('renders correctly', () => {
  const component = (
    <Breadcrumb aria-label="Override me" id="nav-id" listProps={{ id: 'list-id' }}>
      <BreadcrumbLink id="root-id" href="/root">
        Root
      </BreadcrumbLink>
      <BreadcrumbLink href="/root/middle" listItemProps={{ id: 'middle-li' }}>
        Middle
      </BreadcrumbLink>
      <div>Don't show me</div>
      Ignore Me
      <BreadcrumbLink href="/root/middle/current">Current</BreadcrumbLink>
    </Breadcrumb>
  );

  const { asFragment } = render(component);

  expect(asFragment()).toMatchSnapshot();
});
