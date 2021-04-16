import React, { FunctionComponent } from 'react';
import { bool, node, object, string } from 'prop-types';

interface TrailProps {
  children: React.ReactNode;
  listProps?: { [key: React.HTMLProps<HTMLListElement>]: any };
}

export const Trail: FunctionComponent = ({
  children,
  listProps = {},
  ...props
}: TrailProps & React.HTMLProps<HTMLElement>) => {
  return (
    <nav aria-label="Breadcrumbs" {...props}>
      <ol {...listProps}>{children}</ol>
    </nav>
  );
};

Trail.propTypes = {
  children: node.isRequired,
  listProps: object,
};

interface BaseBreadcrumbProps {
  children: node.isRequired;
  linkProps?: { [key: React.HTMLProps<HTMLLinkElement>]: any };
}

interface BreadcrumbProps extends BaseBreadcrumbProps {
  href: string;
}

export const Breadcrumb: FunctionComponent = ({
	children,
  href,
  linkProps = {},
  ...props
}: BreadcrumbProps & React.HTMLProps<HTMLElement>) => (
  <li {...props}>
    <a {...linkProps} href={href}>{children}</a>
  </li>
);

Breadcrumb.propTypes = {
  children: node.isRequired,
  href: string.isRequired,
  linkProps: object,
};

interface CurrentBreadcrumbProps extends BaseBreadcrumbProps {
  link: boolean;
}

export const CurrentBreadcrumb: FunctionComponent = ({
	children,
  link = false,
  linkProps = {},
  ...props
}: CurrentBreadcrumbProps & React.HTMLProps<HTMLElement>) =>
  link ? (
    <li {...props}>
      <a {...linkProps} aria-current="page" href={window.location.href}>{children}</a>
    </li>
  ) : (
    <li {...props}>{children}</li>
  );

CurrentBreadcrumb.propTypes = {
  children: node.isRequired,
  link: bool,
  linkProps: object,
};

CurrentBreadcrumb.displayName = 'CurrentBreadcrumb';
