import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Breadcrumb, BreadcrumbLink } from '../src/breadcrumb';

afterEach(cleanup);

test('renders correctly', () => {
  const component = (
    <Breadcrumb aria-label="Don't override me" id="nav-id" listProps={{ id: 'list-id' }}>
      <BreadcrumbLink id="root-id" href="/root">
        Root
      </BreadcrumbLink>
      <BreadcrumbLink href="/root/middle" listItemProps={{ id: 'middle-li' }}>
        Middle
      </BreadcrumbLink>
      <BreadcrumbLink href="/root/middle/current">Current</BreadcrumbLink>
    </Breadcrumb>
  );

  const { asFragment } = render(component);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <nav
    aria-label="Breadcrumb"
    id="nav-id"
  >
    <ol
      id="list-id"
    >
      <li>
        <a
          href="/root"
          id="root-id"
        >
          Root
        </a>
      </li>
      <li
        id="middle-li"
      >
        <a
          href="/root/middle"
        >
          Middle
        </a>
      </li>
      <li>
        <a
          aria-current="page"
          href="/root/middle/current"
        >
          Current
        </a>
      </li>
    </ol>
  </nav>
</DocumentFragment>
`);
});
