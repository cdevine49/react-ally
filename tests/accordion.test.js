import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { AccordionGroup, Accordion, AccordionHeader, AccordionPanel } from '../src/accordion';
import { UP, DOWN, HOME, END } from '../src/keys';

afterEach(cleanup);

const Component = ({ multi, headingLevel, initialOpen, firstFocus, secondFocus, thirdFocus }) => (
  <AccordionGroup
    id="my-accordion"
    multi={multi}
    headingLevel={headingLevel}
    initialOpen={initialOpen}
  >
    <Accordion>
      <AccordionHeader buttonProps={{ onFocus: firstFocus }}>Header 1</AccordionHeader>
      <AccordionPanel>Content 1</AccordionPanel>
    </Accordion>
    <Accordion>
      <AccordionHeader buttonProps={{ onFocus: secondFocus }}>Header 2</AccordionHeader>
      <AccordionPanel>Content 2</AccordionPanel>
    </Accordion>
    <Accordion>
      <AccordionHeader buttonProps={{ onFocus: thirdFocus }}>Header 3</AccordionHeader>
      <AccordionPanel>Content 3</AccordionPanel>
    </Accordion>
  </AccordionGroup>
);

const _default = (firstButtonDisabled = false) => `
<DocumentFragment>
  <div
    id="my-accordion"
  >
    <h2>
      <button
        aria-controls="my-accordion-0th-content"
        aria-disabled="${firstButtonDisabled}"
        aria-expanded="true"
        id="my-accordion-0th-button"
      >
        Header 1
      </button>
    </h2>
    <div
      aria-hidden="false"
      aria-labelledby="my-accordion-0th-button"
      id="my-accordion-0th-content"
    >
      Content 1
    </div>
    <h2>
      <button
        aria-controls="my-accordion-1th-content"
        aria-disabled="false"
        aria-expanded="false"
        id="my-accordion-1th-button"
      >
        Header 2
      </button>
    </h2>
    <div
      aria-hidden="true"
      aria-labelledby="my-accordion-1th-button"
      id="my-accordion-1th-content"
    />
    <h2>
      <button
        aria-controls="my-accordion-2th-content"
        aria-disabled="false"
        aria-expanded="false"
        id="my-accordion-2th-button"
      >
        Header 3
      </button>
    </h2>
    <div
      aria-hidden="true"
      aria-labelledby="my-accordion-2th-button"
      id="my-accordion-2th-content"
    />
  </div>
</DocumentFragment>
`;

test('default', () => {
  const { asFragment } = render(<Component />);
  expect(asFragment()).toMatchInlineSnapshot(_default());
});

const allclosed = `
<DocumentFragment>
  <div
    id="my-accordion"
  >
    <h2>
      <button
        aria-controls="my-accordion-0th-content"
        aria-disabled="false"
        aria-expanded="false"
        id="my-accordion-0th-button"
      >
        Header 1
      </button>
    </h2>
    <div
      aria-hidden="true"
      aria-labelledby="my-accordion-0th-button"
      id="my-accordion-0th-content"
    />
    <h2>
      <button
        aria-controls="my-accordion-1th-content"
        aria-disabled="false"
        aria-expanded="false"
        id="my-accordion-1th-button"
      >
        Header 2
      </button>
    </h2>
    <div
      aria-hidden="true"
      aria-labelledby="my-accordion-1th-button"
      id="my-accordion-1th-content"
    />
    <h2>
      <button
        aria-controls="my-accordion-2th-content"
        aria-disabled="false"
        aria-expanded="false"
        id="my-accordion-2th-button"
      >
        Header 3
      </button>
    </h2>
    <div
      aria-hidden="true"
      aria-labelledby="my-accordion-2th-button"
      id="my-accordion-2th-content"
    />
  </div>
</DocumentFragment>
`;

const allOpen = `
<DocumentFragment>
  <div
    id="my-accordion"
  >
    <h2>
      <button
        aria-controls="my-accordion-0th-content"
        aria-disabled="false"
        aria-expanded="true"
        id="my-accordion-0th-button"
      >
        Header 1
      </button>
    </h2>
    <div
      aria-hidden="false"
      aria-labelledby="my-accordion-0th-button"
      id="my-accordion-0th-content"
    >
      Content 1
    </div>
    <h2>
      <button
        aria-controls="my-accordion-1th-content"
        aria-disabled="false"
        aria-expanded="true"
        id="my-accordion-1th-button"
      >
        Header 2
      </button>
    </h2>
    <div
      aria-hidden="false"
      aria-labelledby="my-accordion-1th-button"
      id="my-accordion-1th-content"
    >
      Content 2
    </div>
    <h2>
      <button
        aria-controls="my-accordion-2th-content"
        aria-disabled="false"
        aria-expanded="true"
        id="my-accordion-2th-button"
      >
        Header 3
      </button>
    </h2>
    <div
      aria-hidden="false"
      aria-labelledby="my-accordion-2th-button"
      id="my-accordion-2th-content"
    >
      Content 3
    </div>
  </div>
</DocumentFragment>
`;

describe('multi true', () => {
  test('open first', () => {
    const { asFragment } = render(<Component initialOpen="first" multi />);
    expect(asFragment()).toMatchInlineSnapshot(_default());
  });

  test('open none', () => {
    const { asFragment } = render(<Component initialOpen="none" />);
    expect(asFragment()).toMatchInlineSnapshot(allclosed);
  });

  test('open all', () => {
    const { asFragment } = render(<Component initialOpen="all" />);
    expect(asFragment()).toMatchInlineSnapshot(allOpen);
  });

  test('clicking only open accordion header', () => {
    const { asFragment, getByText } = render(<Component />);

    fireEvent.click(getByText('Header 1'));
    expect(asFragment()).toMatchInlineSnapshot(allclosed);
  });

  test('clicking closed accordion header', () => {
    const { asFragment, getByText } = render(<Component initialOpen="none" />);

    fireEvent.click(getByText('Header 1'));
    expect(asFragment()).toMatchInlineSnapshot(_default());
  });

  test('clicking closed accordion header when another open', () => {
    const { asFragment, getByText } = render(<Component />);

    fireEvent.click(getByText('Header 2'));
    fireEvent.click(getByText('Header 3'));
    expect(asFragment()).toMatchInlineSnapshot(allOpen);
  });
});

describe('multi false', () => {
  test('open first', () => {
    const { asFragment } = render(<Component initialOpen="first" multi={false} />);
    expect(asFragment()).toMatchInlineSnapshot(_default(true));
  });

  test('open none', () => {
    const { asFragment } = render(<Component initialOpen="none" multi={false} />);
    expect(asFragment()).toMatchInlineSnapshot(allclosed);
  });

  test('open all', () => {
    console.error = jest.fn();
    render(<Component initialOpen="all" multi={false} />);
    expect(console.error).toHaveBeenCalledWith('Cannot use multi={false} with initialOpen="all"');
  });

  test('clicking only open accordion header', () => {
    const { asFragment, getByText } = render(<Component multi={false} />);

    fireEvent.click(getByText('Header 1'));
    expect(asFragment()).toMatchInlineSnapshot(_default(true));
  });

  test('clicking closed accordion header', () => {
    const { asFragment, getByText } = render(<Component initialOpen="none" multi={false} />);

    fireEvent.click(getByText('Header 1'));
    expect(asFragment()).toMatchInlineSnapshot(_default(true));
  });

  test('clicking closed accordion header when another open', () => {
    const { asFragment, getByText } = render(<Component multi={false} />);

    fireEvent.click(getByText('Header 2'));
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    id="my-accordion"
  >
    <h2>
      <button
        aria-controls="my-accordion-0th-content"
        aria-disabled="false"
        aria-expanded="false"
        id="my-accordion-0th-button"
      >
        Header 1
      </button>
    </h2>
    <div
      aria-hidden="true"
      aria-labelledby="my-accordion-0th-button"
      id="my-accordion-0th-content"
    />
    <h2>
      <button
        aria-controls="my-accordion-1th-content"
        aria-disabled="true"
        aria-expanded="true"
        id="my-accordion-1th-button"
      >
        Header 2
      </button>
    </h2>
    <div
      aria-hidden="false"
      aria-labelledby="my-accordion-1th-button"
      id="my-accordion-1th-content"
    >
      Content 2
    </div>
    <h2>
      <button
        aria-controls="my-accordion-2th-content"
        aria-disabled="false"
        aria-expanded="false"
        id="my-accordion-2th-button"
      >
        Header 3
      </button>
    </h2>
    <div
      aria-hidden="true"
      aria-labelledby="my-accordion-2th-button"
      id="my-accordion-2th-content"
    />
  </div>
</DocumentFragment>
`);
  });
});

describe('Focus Management', () => {
  let firstButton, firstFocus, secondButton, secondFocus, thirdButton, thirdFocus;
  beforeEach(() => {
    firstFocus = jest.fn();
    secondFocus = jest.fn();
    thirdFocus = jest.fn();
    const component = (
      <Component firstFocus={firstFocus} secondFocus={secondFocus} thirdFocus={thirdFocus} />
    );

    const { getByText } = render(component);
    firstButton = getByText('Header 1');
    secondButton = getByText('Header 2');
    thirdButton = getByText('Header 3');
  });

  describe('First Button', () => {
    test('UP', () => {
      fireEvent.keyDown(firstButton, {
        key: 'UP',
        keyCode: UP
      });
      expect(firstFocus).not.toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).toHaveBeenCalled();
    });

    test('DOWN', () => {
      fireEvent.keyDown(firstButton, {
        key: 'DOWN',
        keyCode: DOWN
      });
      expect(firstFocus).not.toHaveBeenCalled();
      expect(secondFocus).toHaveBeenCalled();
      expect(thirdFocus).not.toHaveBeenCalled();
    });

    test('HOME', () => {
      fireEvent.keyDown(firstButton, {
        key: 'HOME',
        keyCode: HOME
      });
      expect(firstFocus).toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).not.toHaveBeenCalled();
    });

    test('END', () => {
      fireEvent.keyDown(firstButton, {
        key: 'END',
        keyCode: END
      });
      expect(firstFocus).not.toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).toHaveBeenCalled();
    });
  });
  describe('Second Button', () => {
    test('UP', () => {
      fireEvent.keyDown(secondButton, {
        key: 'UP',
        keyCode: UP
      });
      expect(firstFocus).toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).not.toHaveBeenCalled();
    });

    test('DOWN', () => {
      fireEvent.keyDown(secondButton, {
        key: 'DOWN',
        keyCode: DOWN
      });
      expect(firstFocus).not.toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).toHaveBeenCalled();
    });

    test('HOME', () => {
      fireEvent.keyDown(secondButton, {
        key: 'HOME',
        keyCode: HOME
      });
      expect(firstFocus).toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).not.toHaveBeenCalled();
    });

    test('END', () => {
      fireEvent.keyDown(secondButton, {
        key: 'END',
        keyCode: END
      });
      expect(firstFocus).not.toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).toHaveBeenCalled();
    });
  });
  describe('Last Button', () => {
    test('UP', () => {
      fireEvent.keyDown(thirdButton, {
        key: 'UP',
        keyCode: UP
      });
      expect(firstFocus).not.toHaveBeenCalled();
      expect(secondFocus).toHaveBeenCalled();
      expect(thirdFocus).not.toHaveBeenCalled();
    });

    test('DOWN', () => {
      thirdFocus.mockClear();
      fireEvent.keyDown(thirdButton, {
        key: 'DOWN',
        keyCode: DOWN
      });
      expect(firstFocus).toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).not.toHaveBeenCalled();
    });

    test('HOME', () => {
      fireEvent.keyDown(thirdButton, {
        key: 'HOME',
        keyCode: HOME
      });
      expect(firstFocus).toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).not.toHaveBeenCalled();
    });

    test('END', () => {
      fireEvent.keyDown(thirdButton, {
        key: 'END',
        keyCode: END
      });
      expect(firstFocus).not.toHaveBeenCalled();
      expect(secondFocus).not.toHaveBeenCalled();
      expect(thirdFocus).toHaveBeenCalled();
    });
  });
});
