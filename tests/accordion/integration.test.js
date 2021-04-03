import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Accordion, Item, Header, Panel } from '../../src/accordion';

describe('Initial State', () => {
  test('all panels can be initialized collapsed', () => {
    render(
      <Accordion id="my-accordion" initialOpen="none">
        <Item>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>Content 2</Panel>
        </Item>
      </Accordion>,
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  test('only the first panel can initialize expanded', () => {
    render(
      <Accordion id="my-accordion" initialOpen="first">
        <Item>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>Content 2</Panel>
        </Item>
      </Accordion>,
    );

    expect(screen.queryByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  test('all panels can be initialized expanded', () => {
    render(
      <Accordion id="my-accordion" initialOpen="all">
        <Item>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>Content 2</Panel>
        </Item>
      </Accordion>,
    );

    expect(screen.queryByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).toBeInTheDocument();
  });
});

describe('Toggling Panels', () => {
  test(`Clicking the header of a collapsed panel expands the associated panel`, () => {
    render(
      <Accordion id="my-accordion" initialOpen="none">
        <Item>
          <Header>Header</Header>
          <Panel>Content</Panel>
        </Item>
      </Accordion>,
    );
    const header = screen.getByRole('button', { name: 'Header' });
    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    user.click(header);
    expect(screen.queryByText('Content')).toBeInTheDocument();
  });

  test(`Clicking the header of a collapsed panel collapses the currently open panel if the implemention only allows one open panel`, () => {
    render(
      <Accordion id="my-accordion" initialOpen="first" multi={false}>
        <Item>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>Content 2</Panel>
        </Item>
      </Accordion>,
    );
    const header2 = screen.getByRole('button', { name: 'Header 2' });
    expect(screen.queryByText('Content 1')).toBeInTheDocument();

    user.click(header2);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test(`Clicking the header of a collapsed panel leaves the currently open panel expanded if the implemention only allows multiple open panels`, () => {
    render(
      <Accordion id="my-accordion" initialOpen="first" multi={true}>
        <Item>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>Content 2</Panel>
        </Item>
      </Accordion>,
    );
    const header2 = screen.getByRole('button', { name: 'Header 2' });
    expect(screen.queryByText('Content 1')).toBeInTheDocument();

    user.click(header2);
    expect(screen.queryByText('Content 1')).toBeInTheDocument();
  });

  test(`Clicking the header of a expanded panel collapses the associated panel if the implementation allows`, () => {
    render(
      <Accordion id="my-accordion" initialOpen="first">
        <Item>
          <Header>Header</Header>
          <Panel>Content</Panel>
        </Item>
      </Accordion>,
    );
    const header = screen.getByRole('button', { name: 'Header' });
    expect(screen.queryByText('Content')).toBeInTheDocument();

    user.click(header);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  test(`Clicking the header of a expanded panel collapses the associated panel if the implementation requires one panel remain open and if the associated panel is not the only open panel`, () => {
    render(
      <Accordion id="my-accordion" initialOpen="all" allowHideAllPanels={false}>
        <Item>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>Content 2</Panel>
        </Item>
      </Accordion>,
    );
    const header = screen.getByRole('button', { name: 'Header 1' });
    expect(screen.queryByText('Content 1')).toBeInTheDocument();

    user.click(header);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test(`Clicking the header of a expanded panel leaves the associated panel expanded if the implementation requires one panel remain open and if the associated panel is the only open panel`, () => {
    render(
      <Accordion
        id="my-accordion"
        initialOpen="first"
        allowHideAllPanels={false}
      >
        <Item>
          <Header>Header 1</Header>
          <Panel>Content 1</Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>Content 2</Panel>
        </Item>
      </Accordion>,
    );
    const header = screen.getByRole('button', { name: 'Header 1' });
    expect(screen.queryByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    user.click(header);
    expect(screen.queryByText('Content 1')).toBeInTheDocument();
  });
});

describe('Defaults', () => {
  test('panels can always be closed', () => {
    render(
      <Accordion id="my-accordion" initialOpen="first">
        <Item>
          <Header>Header</Header>
          <Panel>Panel</Panel>
        </Item>
      </Accordion>,
    );

    user.click(screen.getByRole('button'));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  test('only the first panel is initially open', () => {
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
    expect(screen.queryByText('Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
  });

  test('multiple panels can be open simultaneously', () => {
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
    user.click(screen.getByRole('button', { name: 'Header 2' }));

    expect(screen.queryByText('Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2')).toBeInTheDocument();
  });
});
