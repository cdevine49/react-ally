import React from 'react';
import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Accordion, Item, Header, Panel } from '../../src/accordion';
import { Section } from '../../src/sectioning';

test('The title of each accordion header is contained in an element with role button', () => {
  render(<Header>Header</Header>);
  expect(screen.queryByRole('button', { name: 'Header' })).toBeInTheDocument();
});

test('Each accordion header button is wrapped in an element with role heading that has value set for appropriate aria-level', () => {
  render(
    <>
      <h1>Page Title</h1>
      <Accordion id="my-accordion">
        <Item>
          <Header>Second</Header>
        </Item>
      </Accordion>
      <Section>
        <Accordion id="my-accordion">
          <Item>
            <Header>Third</Header>
          </Item>
        </Accordion>
      </Section>
      <Accordion headingLevel={6} id="my-accordion">
        <Item>
          <Header>Sixth</Header>
        </Item>
      </Accordion>
    </>,
  );

  const h2 = screen.getByRole('heading', { level: 2 });
  expect(
    within(h2).queryByRole('button', { name: 'Second' }),
  ).toBeInTheDocument();
  const h3 = screen.getByRole('heading', { level: 3 });
  expect(
    within(h3).queryByRole('button', { name: 'Third' }),
  ).toBeInTheDocument();
  const h6 = screen.getByRole('heading', { level: 6 });
  expect(
    within(h6).queryByRole('button', { name: 'Sixth' }),
  ).toBeInTheDocument();
});

test('If the panel associated with a header is visible, the header button element has aria-expanded set to true', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first">
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
    </Accordion>,
  );
  expect(screen.getByText('Panel 1')).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Header 1' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  const button2 = screen.getByRole('button', { name: 'Header 2' });
  user.click(button2);
  expect(screen.getByText('Panel 2')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Header 2' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('If the panel associated with a header is invisible, the header button element has aria-expanded set to false', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first" multi={false}>
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
    </Accordion>,
  );
  expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Header 2' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  const button1 = screen.getByRole('button', { name: 'Header 1' });
  user.click(button1);
  expect(screen.queryByText('Panel 1')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Header 1' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('The header button element has aria-controls set to the ID of the element containing the panel content', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first">
      <Item>
        <Header>Header</Header>
        <Panel>Panel</Panel>
      </Item>
    </Accordion>,
  );

  const button = screen.getByRole('button');
  const panel = screen.getByRole('region');

  expect(button).toHaveAttribute('aria-controls', panel.id);
});

test('If the panel associated with a header is visible, and if the accordion does not permit the panel to be collapsed, the header button element has aria-disabled set to true', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first" allowHideAllPanels={false}>
      <Item>
        <Header>Header</Header>
        <Panel>Panel</Panel>
      </Item>
    </Accordion>,
  );

  expect(screen.getByRole('region')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
});

test('If the panel associated with a header is invisible, the header button has aria-disabled set to false', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first" allowHideAllPanels={false}>
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
    </Accordion>,
  );

  expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Header 2' })).toHaveAttribute(
    'aria-disabled',
    'false',
  );
});

test('If the panel associated with a header is visible, and if the accordion permits a panel to be closed, the header button has aria-disabled set to false', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first" allowHideAllPanels={true}>
      <Item>
        <Header>Header</Header>
        <Panel>Panel</Panel>
      </Item>
    </Accordion>,
  );

  expect(screen.getByRole('region')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'false');
});

test('Each element that serves as a container for panel content has role region', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first">
      <Item>
        <Header>Header</Header>
        <Panel>Panel</Panel>
      </Item>
    </Accordion>,
  );

  const region = screen.getByRole('region');
  expect(region).toBeInTheDocument();
  expect(region).toHaveTextContent('Panel');
});

test('Each element that serves as a container for panel content has aria-labelledby with a value that refers to the button that controls display of the panel', () => {
  render(
    <Accordion id="my-accordion" initialOpen="first">
      <Item>
        <Header>Header</Header>
        <Panel>Panel</Panel>
      </Item>
    </Accordion>,
  );

  const button = screen.getByRole('button');
  expect(screen.getByRole('region')).toHaveAttribute(
    'aria-labelledby',
    button.id,
  );
});
