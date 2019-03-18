import React from 'react';
import { object, string } from 'prop-types';

export const Breadcrumb = ({ listProps = {}, children, ...props }) => {
  const count = React.Children.count(children);
  return (
    <nav {...props} aria-label="Breadcrumb">
      <ol {...listProps}>
        {React.Children.map(children, (child, index) => {
          if (count - 1 === index) {
            return React.cloneElement(child, { 'aria-current': 'page' });
          }

          return child;
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  listProps: object
};

export const BreadcrumbLink = ({ listItemProps = {}, ...props }) => (
  <li {...listItemProps}>
    <a {...props} />
  </li>
);

BreadcrumbLink.propTypes = {
  href: string.isRequired,
  listItemProps: object
};

BreadcrumbLink.displayName = 'BreadcrumbLink';
