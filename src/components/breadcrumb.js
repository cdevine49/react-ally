import React from 'react';
import { object, string } from 'prop-types';

export const Breadcrumb = ({ listProps, children, ...props }) => {
  const count = React.Children.count(children);
  return (
    <nav {...props} aria-label="Breadcrumb">
      <ol {...listProps}>
        {React.Children.map(children, (child, index) => {
          const displayName = child && child.type && child.type.displayName;
          if (['BreadcrumbLink', 'Styled(BreadcrumbLink)'].find(el => el === displayName)) {
            if (count - 1 === index) {
              return React.cloneElement(child, { 'aria-current': true });
            }

            return child;
          }
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.defaultProps = {
  listProps: {}
};

Breadcrumb.propTypes = {
  listProps: object
};

export const BreadcrumbLink = ({ listItemProps, ...props }) => (
  <li {...listItemProps}>
    <a {...props} />
  </li>
);

BreadcrumbLink.defaultProps = {
  listItemProps: {}
};

BreadcrumbLink.propTypes = {
  href: string.isRequired,
  listItemProps: object
};

BreadCrumbLink.displayName = 'BreadCrumbLink';
