import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { AccordionGroup, Accordion, AccordionHeader, AccordionContent } from '../es/react-ally.js';

afterEach(cleanup);

describe('Initial render', () => {
  test('default', () => {
    const component = (
      <AccordionGroup headingLevel={3}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('openFirst false', () => {
    const component = (
      <AccordionGroup headingLevel={3} openFirst={false}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('exactlyOneOpen true and openFirst false', () => {
    const component = (
      <AccordionGroup exactlyOneOpen headingLevel={3} openFirst={false}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { asFragment } = render(component);

    expect(asFragment()).toMatchSnapshot();
  });
});

test('Closing first accordion with no others open', () => {
  const component = (
    <AccordionGroup openFirst headingLevel={3}>
      <Accordion id="first">
        <AccordionHeader>Header 1</AccordionHeader>
        <AccordionContent>Content 1</AccordionContent>
      </Accordion>
      <Accordion id="second">
        <AccordionHeader>Header 2</AccordionHeader>
        <AccordionContent>Content 2</AccordionContent>
      </Accordion>
    </AccordionGroup>
  );

  const { asFragment, getByText, rerender } = render(component);

  fireEvent.click(getByText('Header 1'));
  rerender(component);

  expect(asFragment()).toMatchSnapshot();
});

test('Opening second accordion when first already open', () => {
  const component = (
    <AccordionGroup openFirst headingLevel={3}>
      <Accordion id="first">
        <AccordionHeader>Header 1</AccordionHeader>
        <AccordionContent>Content 1</AccordionContent>
      </Accordion>
      <Accordion id="second">
        <AccordionHeader>Header 2</AccordionHeader>
        <AccordionContent>Content 2</AccordionContent>
      </Accordion>
    </AccordionGroup>
  );

  const { asFragment, getByText, rerender } = render(component);

  fireEvent.click(getByText('Header 2'));
  rerender(component);

  expect(asFragment()).toMatchSnapshot();
});

describe('exactlyOneOpen', () => {
  test('Closing first accordion when first open', () => {
    const component = (
      <AccordionGroup exactlyOneOpen openFirst headingLevel={3}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { asFragment, getByText, rerender } = render(component);

    fireEvent.click(getByText('Header 1'));
    rerender(component);

    expect(asFragment()).toMatchSnapshot();
  });

  test('Opening second accordion when first open', () => {
    const component = (
      <AccordionGroup exactlyOneOpen openFirst headingLevel={3}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { asFragment, getByText, rerender } = render(component);

    fireEvent.click(getByText('Header 2'));
    rerender(component);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Focus Management', () => {
  test('Up arrow', () => {
    const component = (
      <AccordionGroup headingLevel={3}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
        <Accordion id="third">
          <AccordionHeader>Header 3</AccordionHeader>
          <AccordionContent>Content 3</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { getByText, rerender } = render(component);

    const firstButton = getByText('Header 1');
    firstButton.focus();

    fireEvent.keyDown(firstButton, {
      key: 'Up Arrow',
      keyCode: 38
    });

    rerender(component);

    const thirdButton = getByText('Header 3');
    expect(document.activeElement).toBe(thirdButton);

    fireEvent.keyDown(thirdButton, {
      key: 'Up Arrow',
      keyCode: 38
    });

    rerender(component);

    const secondButton = getByText('Header 2');
    expect(document.activeElement).toBe(secondButton);
  });

  test('Down arrow', () => {
    const component = (
      <AccordionGroup headingLevel={3}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
        <Accordion id="third">
          <AccordionHeader>Header 3</AccordionHeader>
          <AccordionContent>Content 3</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { getByText, rerender } = render(component);

    const firstButton = getByText('Header 1');
    firstButton.focus();

    fireEvent.keyDown(firstButton, {
      key: 'Down Arrow',
      keyCode: 40
    });

    rerender(component);

    const secondButton = getByText('Header 2');
    expect(document.activeElement).toBe(secondButton);

    fireEvent.keyDown(secondButton, {
      key: 'Down Arrow',
      keyCode: 40
    });

    rerender(component);

    const thirdButton = getByText('Header 3');
    expect(document.activeElement).toBe(thirdButton);

    fireEvent.keyDown(thirdButton, {
      key: 'Down Arrow',
      keyCode: 40
    });

    rerender(component);

    expect(document.activeElement).toBe(firstButton);
  });

  test('Home', () => {
    const component = (
      <AccordionGroup headingLevel={3}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
        <Accordion id="third">
          <AccordionHeader>Header 3</AccordionHeader>
          <AccordionContent>Content 3</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { getByText, rerender } = render(component);

    const thirdButton = getByText('Header 3');
    thirdButton.focus();

    fireEvent.keyDown(thirdButton, {
      key: 'Home',
      keyCode: 36
    });

    rerender(component);

    const firstButton = getByText('Header 1');
    expect(document.activeElement).toBe(firstButton);

    fireEvent.keyDown(firstButton, {
      key: 'Home',
      keyCode: 36
    });

    rerender(component);

    expect(document.activeElement).toBe(firstButton);
  });

  test('End', () => {
    const component = (
      <AccordionGroup headingLevel={3}>
        <Accordion id="first">
          <AccordionHeader>Header 1</AccordionHeader>
          <AccordionContent>Content 1</AccordionContent>
        </Accordion>
        <Accordion id="second">
          <AccordionHeader>Header 2</AccordionHeader>
          <AccordionContent>Content 2</AccordionContent>
        </Accordion>
        <Accordion id="third">
          <AccordionHeader>Header 3</AccordionHeader>
          <AccordionContent>Content 3</AccordionContent>
        </Accordion>
      </AccordionGroup>
    );

    const { getByText, rerender } = render(component);

    const firstButton = getByText('Header 1');
    firstButton.focus();

    fireEvent.keyDown(firstButton, {
      key: 'End',
      keyCode: 35
    });

    rerender(component);

    const thirdButton = getByText('Header 3');
    expect(document.activeElement).toBe(thirdButton);

    fireEvent.keyDown(thirdButton, {
      key: 'End',
      keyCode: 35
    });

    rerender(component);

    expect(document.activeElement).toBe(thirdButton);
  });
});
