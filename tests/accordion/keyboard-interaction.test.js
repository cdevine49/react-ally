import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Accordion, Item, Header, Panel } from '../../src/accordion';

const enterOrSpace = ['{enter}', '{space}'];
enterOrSpace.forEach((key) => {
  test(`When focus is on the header of a collapsed panel, ${key} expands the associated panel`, () => {
    render(
      <Accordion id="my-accordion" initialOpen="none">
        <Item>
          <Header>Header</Header>
          <Panel>Content</Panel>
        </Item>
      </Accordion>,
    );
    const header = screen.getByRole('button', { name: 'Header' });
    header.focus();

    expect(screen.queryByText('Content')).not.toBeInTheDocument();

    user.type(header, key, { skipClick: true });
    expect(screen.queryByText('Content')).toBeInTheDocument();
  });

  test(`When focus is on the header of a collapsed panel, ${key} collapses the currently open panel if the implemention only allows one open panel`, () => {
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
    header2.focus();

    expect(screen.queryByText('Content 1')).toBeInTheDocument();

    user.type(header2, key, { skipClick: true });
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  test(`When focus is on the header of a expanded panel, ${key} collapses the associated panel`, () => {
    render(
      <Accordion id="my-accordion" initialOpen="first">
        <Item>
          <Header>Header</Header>
          <Panel>Content</Panel>
        </Item>
      </Accordion>,
    );
    const header = screen.getByRole('button', { name: 'Header' });
    header.focus();

    expect(screen.queryByText('Content')).toBeInTheDocument();

    user.type(header, key, { skipClick: true });
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});

test('Tab moves focus to the next focusable element; all focusable elements in the accordion are included in the page tab sequence', () => {
  render(
    <>
      <Accordion id="my-accordion" initialOpen="first">
        <Item>
          <Header>Header 1</Header>
          <Panel>
            <button>Focus Me</button>
            <label>
              Focus Me Too
              <input type="text" />
            </label>
          </Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>
            <input type="text" />
          </Panel>
        </Item>
      </Accordion>
      <button>Focus Outside Accordion</button>
    </>,
  );

  expect(document.body).toHaveFocus();
  user.tab();
  expect(screen.getByRole('button', { name: 'Header 1' })).toHaveFocus();
  user.tab();
  expect(screen.getByRole('button', { name: 'Focus Me' })).toHaveFocus();
  user.tab();
  expect(screen.getByLabelText('Focus Me Too')).toHaveFocus();
  user.tab();
  expect(screen.getByRole('button', { name: 'Header 2' })).toHaveFocus();
  user.tab();
  expect(
    screen.getByRole('button', { name: 'Focus Outside Accordion' }),
  ).toHaveFocus();
});

test('Shift tab moves focus to the previous focusable element; all focusable elements in the accordion are included in the page tab sequence', () => {
  render(
    <>
      <button>Focus Outside Accordion</button>
      <Accordion id="my-accordion" initialOpen="first">
        <Item>
          <Header>Header 1</Header>
          <Panel>
            <button>Focus Me</button>
            <label>
              Focus Me Too
              <input type="text" />
            </label>
          </Panel>
        </Item>
        <Item>
          <Header>Header 2</Header>
          <Panel>
            <input type="text" />
          </Panel>
        </Item>
      </Accordion>
    </>,
  );

  expect(document.body).toHaveFocus();
  user.tab({ shift: true });
  expect(screen.getByRole('button', { name: 'Header 2' })).toHaveFocus();
  user.tab({ shift: true });
  expect(screen.getByLabelText('Focus Me Too')).toHaveFocus();
  user.tab({ shift: true });
  expect(screen.getByRole('button', { name: 'Focus Me' })).toHaveFocus();
  user.tab({ shift: true });
  expect(screen.getByRole('button', { name: 'Header 1' })).toHaveFocus();
  user.tab({ shift: true });
  expect(
    screen.getByRole('button', { name: 'Focus Outside Accordion' }),
  ).toHaveFocus();
});

test('If focus is on an accordion header, {arrowdown} moves focus to the next accordion header', () => {
  render(
    <Accordion id="my-accordion">
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
      <Item>
        <Header>Header 3</Header>
        <Panel>Panel 3</Panel>
      </Item>
    </Accordion>,
  );
  const header1 = screen.getByRole('button', { name: 'Header 1' });
  header1.focus();

  user.type(header1, '{arrowdown}', { skipClick: true });
  expect(screen.getByRole('button', { name: 'Header 2' })).toHaveFocus();
});

test('If focus is on the last accordion header, {arrowdown} moves focus to the first accordion header', () => {
  render(
    <Accordion id="my-accordion">
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
      <Item>
        <Header>Header 3</Header>
        <Panel>Panel 3</Panel>
      </Item>
    </Accordion>,
  );
  const lastHeader = screen.getByRole('button', { name: 'Header 3' });
  lastHeader.focus();

  user.type(lastHeader, '{arrowdown}', { skipClick: true });
  expect(screen.getByRole('button', { name: 'Header 1' })).toHaveFocus();
});

test('If focus is on an accordion header, {arrowup} moves focus to the previous accordion header', () => {
  render(
    <Accordion id="my-accordion">
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
      <Item>
        <Header>Header 3</Header>
        <Panel>Panel 3</Panel>
      </Item>
    </Accordion>,
  );
  const header2 = screen.getByRole('button', { name: 'Header 2' });
  header2.focus();

  user.type(header2, '{arrowup}', { skipClick: true });
  expect(screen.getByRole('button', { name: 'Header 1' })).toHaveFocus();
});

test('If focus is on the first accordion header, {arrowup} moves focus to the last accordion header', () => {
  render(
    <Accordion id="my-accordion">
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
      <Item>
        <Header>Header 3</Header>
        <Panel>Panel 3</Panel>
      </Item>
    </Accordion>,
  );
  const firstHeader = screen.getByRole('button', { name: 'Header 1' });
  firstHeader.focus();

  user.type(firstHeader, '{arrowup}', { skipClick: true });
  expect(screen.getByRole('button', { name: 'Header 3' })).toHaveFocus();
});

test('When focus is on an accordion header, {home} moves focus to the first accordion header', () => {
  render(
    <Accordion id="my-accordion">
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
      <Item>
        <Header>Header 3</Header>
        <Panel>Panel 3</Panel>
      </Item>
    </Accordion>,
  );
  const headers = screen.getAllByRole('button');
  const firstHeader = headers[0];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    header.focus();
    user.type(header, '{home}', { skipClick: true });
    expect(firstHeader).toHaveFocus();
  }
});

test('When focus is on an accordion header, {end} moves focus to the first accordion header', () => {
  render(
    <Accordion id="my-accordion">
      <Item>
        <Header>Header 1</Header>
        <Panel>Panel 1</Panel>
      </Item>
      <Item>
        <Header>Header 2</Header>
        <Panel>Panel 2</Panel>
      </Item>
      <Item>
        <Header>Header 3</Header>
        <Panel>Panel 3</Panel>
      </Item>
    </Accordion>,
  );
  const headers = screen.getAllByRole('button');
  const lastHeader = headers[headers.length - 1];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    header.focus();
    user.type(header, '{end}', { skipClick: true });
    expect(lastHeader).toHaveFocus();
  }
});
