import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Breadcrumb, CurrentBreadcrumb, Trail } from '../../src/breadcrumb';

test('Breadcrumb trail is contained within a navigation landmark region', () => {
	render(
		<Trail>
		<Breadcrumb href="">Previous Page</Breadcrumb>
		<CurrentBreadcrumb>This Page</CurrentBreadcrumb>
		</Trail>,
	);
	expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('The landmark region is labelled via aria-label', () => {
	render(
		<Trail>
		<Breadcrumb href="">Previous Page</Breadcrumb>
		<CurrentBreadcrumb>This Page</CurrentBreadcrumb>
		</Trail>,
	);
	expect(screen.getByRole('navigation')).toHaveAttribute(
		'aria-label',
		'Breadcrumbs',
	);
});

test('If the reference to the current page is a link, it has aria-current set to page', () => {
	render(
		<Trail>
		<Breadcrumb href="">Previous Page</Breadcrumb>
		<CurrentBreadcrumb link>This Page</CurrentBreadcrumb>
		</Trail>,
	);

	expect(screen.getByRole('link', {name: 'This Page'})).toHaveAttribute('aria-current', 'page');
});
