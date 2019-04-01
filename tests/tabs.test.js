import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../src/tabs';
import { UP, LEFT, DOWN, RIGHT, HOME, END, SPACE } from '../src/keys';

afterEach(cleanup);

test('missing required props', () => {
  console.error = jest.fn();
  render(
    <Tabs>
      <TabList>
        <Tab />
      </TabList>
      <TabPanels>
        <TabPanel />
      </TabPanels>
    </Tabs>
  );
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`id\` is marked as required in \`Tabs\`, but its value is \`undefined\`.
    in Tabs`);
});

const arrowTrapped = (activation = 'automatic') => {
  const movesFocusToPreviousTab = keyCode => {
    const afocus = jest.fn(),
      bfocus = jest.fn(),
      cfocus = jest.fn();
    const { asFragment, getByText } = render(
      <Tabs id="alphabet">
        <TabList manual={activation === 'manual'}>
          <Tab onFocus={afocus}>A-tab</Tab>
          <Tab onFocus={bfocus}>B-tab</Tab>
          <Tab onFocus={cfocus}>C-tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>A-panel</TabPanel>
          <TabPanel>B-panel</TabPanel>
          <TabPanel>C-panel</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(cfocus).not.toHaveBeenCalled();
    fireEvent.keyDown(getByText('A-tab'), {
      keyCode
    });

    expect(cfocus).toHaveBeenCalled();

    expect(afocus).not.toHaveBeenCalled();
    fireEvent.keyDown(getByText('B-tab'), {
      keyCode
    });

    expect(afocus).toHaveBeenCalled();

    expect(bfocus).not.toHaveBeenCalled();
    fireEvent.keyDown(getByText('C-tab'), {
      keyCode
    });

    expect(bfocus).toHaveBeenCalled();
  };

  const movesFocusToNextTab = keyCode => {
    const afocus = jest.fn(),
      bfocus = jest.fn(),
      cfocus = jest.fn();
    const { getByText } = render(
      <Tabs id="alphabet">
        <TabList>
          <Tab onFocus={afocus}>A-tab</Tab>
          <Tab onFocus={bfocus}>B-tab</Tab>
          <Tab onFocus={cfocus}>C-tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>A-panel</TabPanel>
          <TabPanel>B-panel</TabPanel>
          <TabPanel>C-panel</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(bfocus).not.toHaveBeenCalled();
    fireEvent.keyDown(getByText('A-tab'), {
      keyCode
    });

    expect(bfocus).toHaveBeenCalled();

    expect(cfocus).not.toHaveBeenCalled();
    fireEvent.keyDown(getByText('B-tab'), {
      keyCode
    });

    expect(cfocus).toHaveBeenCalled();

    expect(afocus).not.toHaveBeenCalled();
    fireEvent.keyDown(getByText('C-tab'), {
      keyCode
    });

    expect(afocus).toHaveBeenCalled();
  };

  test('Left arrow', () => {
    movesFocusToPreviousTab(LEFT);
  });
  test('Up arrow', () => {
    movesFocusToPreviousTab(UP);
  });
  test('Down arrow', () => {
    movesFocusToNextTab(DOWN);
  });
  test('Right arrow', () => {
    movesFocusToNextTab(RIGHT);
  });

  test('Home', () => {
    const afocus = jest.fn();
    const { getByText } = render(
      <Tabs id="alphabet">
        <TabList>
          <Tab onFocus={afocus}>A-tab</Tab>
          <Tab>B-tab</Tab>
          <Tab>C-tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>A-panel</TabPanel>
          <TabPanel>B-panel</TabPanel>
          <TabPanel>C-panel</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const goHome = text => {
      const tab = getByText(text);
      fireEvent.click(tab);
      fireEvent.keyDown(tab, {
        keyCode: HOME
      });
    };
    expect(afocus).not.toHaveBeenCalled();

    goHome('B-tab');
    expect(afocus).toHaveBeenCalledTimes(1);

    goHome('C-tab');
    expect(afocus).toHaveBeenCalledTimes(2);
  });

  test('End', () => {
    const cfocus = jest.fn();
    const { getByText } = render(
      <Tabs id="alphabet">
        <TabList>
          <Tab>A-tab</Tab>
          <Tab>B-tab</Tab>
          <Tab onFocus={cfocus}>C-tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>A-panel</TabPanel>
          <TabPanel>B-panel</TabPanel>
          <TabPanel>C-panel</TabPanel>
        </TabPanels>
      </Tabs>
    );

    const goHome = text => {
      const tab = getByText(text);
      fireEvent.click(tab);
      fireEvent.keyDown(tab, {
        keyCode: END
      });
    };
    expect(cfocus).not.toHaveBeenCalled();

    goHome('A-tab');
    expect(cfocus).toHaveBeenCalledTimes(1);

    goHome('B-tab');
    expect(cfocus).toHaveBeenCalledTimes(2);
  });
};

describe('Automatic', () => {
  arrowTrapped();

  test('tabs opened on focus', () => {
    const afocus = jest.fn(),
      bfocus = jest.fn(),
      cfocus = jest.fn();
    const { asFragment, getByText } = render(
      <Tabs id="alphabet">
        <TabList>
          <Tab onFocus={afocus}>A-tab</Tab>
          <Tab onFocus={bfocus}>B-tab</Tab>
          <Tab onFocus={cfocus}>C-tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>A-panel</TabPanel>
          <TabPanel>B-panel</TabPanel>
          <TabPanel>C-panel</TabPanel>
        </TabPanels>
      </Tabs>
    );

    fireEvent.keyDown(getByText('A-tab'), {
      keyCode: RIGHT
    });
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    id="alphabet"
  >
    <div
      role="tablist"
    >
      <button
        aria-controls="alphabet-0th-panel"
        aria-selected="false"
        id="alphabet-0th-tab"
        role="tab"
        tabindex="-1"
      >
        A-tab
      </button>
      <button
        aria-controls="alphabet-1th-panel"
        aria-selected="true"
        id="alphabet-1th-tab"
        role="tab"
        tabindex="0"
      >
        B-tab
      </button>
      <button
        aria-controls="alphabet-2th-panel"
        aria-selected="false"
        id="alphabet-2th-tab"
        role="tab"
        tabindex="-1"
      >
        C-tab
      </button>
    </div>
    <div
      aria-labelledby="alphabet-0th-tab"
      aria-selected="false"
      id="alphabet-0th-panel"
      role="tabpanel"
      style="display: none;"
      tabindex="0"
    >
      A-panel
    </div>
    <div
      aria-labelledby="alphabet-1th-tab"
      aria-selected="true"
      id="alphabet-1th-panel"
      role="tabpanel"
      style="display: inherit;"
      tabindex="0"
    >
      B-panel
    </div>
    <div
      aria-labelledby="alphabet-2th-tab"
      aria-selected="false"
      id="alphabet-2th-panel"
      role="tabpanel"
      style="display: none;"
      tabindex="0"
    >
      C-panel
    </div>
  </div>
</DocumentFragment>
`);
  });
});

describe('Manual', () => {
  arrowTrapped('manual');

  test('tabs focused without opening', () => {
    const afocus = jest.fn(),
      bfocus = jest.fn(),
      cfocus = jest.fn();
    const { asFragment, getByText } = render(
      <Tabs id="alphabet">
        <TabList manual>
          <Tab onFocus={afocus}>A-tab</Tab>
          <Tab onFocus={bfocus}>B-tab</Tab>
          <Tab onFocus={cfocus}>C-tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>A-panel</TabPanel>
          <TabPanel>B-panel</TabPanel>
          <TabPanel>C-panel</TabPanel>
        </TabPanels>
      </Tabs>
    );

    fireEvent.keyDown(getByText('A-tab'), {
      keyCode: RIGHT
    });

    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    id="alphabet"
  >
    <div
      role="tablist"
    >
      <button
        aria-controls="alphabet-0th-panel"
        aria-selected="true"
        id="alphabet-0th-tab"
        role="tab"
        tabindex="0"
      >
        A-tab
      </button>
      <button
        aria-controls="alphabet-1th-panel"
        aria-selected="false"
        id="alphabet-1th-tab"
        role="tab"
        tabindex="-1"
      >
        B-tab
      </button>
      <button
        aria-controls="alphabet-2th-panel"
        aria-selected="false"
        id="alphabet-2th-tab"
        role="tab"
        tabindex="-1"
      >
        C-tab
      </button>
    </div>
    <div
      aria-labelledby="alphabet-0th-tab"
      aria-selected="true"
      id="alphabet-0th-panel"
      role="tabpanel"
      style="display: inherit;"
      tabindex="0"
    >
      A-panel
    </div>
    <div
      aria-labelledby="alphabet-1th-tab"
      aria-selected="false"
      id="alphabet-1th-panel"
      role="tabpanel"
      style="display: none;"
      tabindex="0"
    >
      B-panel
    </div>
    <div
      aria-labelledby="alphabet-2th-tab"
      aria-selected="false"
      id="alphabet-2th-panel"
      role="tabpanel"
      style="display: none;"
      tabindex="0"
    >
      C-panel
    </div>
  </div>
</DocumentFragment>
`);
  });

  test('clicking opens tab panel', () => {
    const { asFragment, getByText } = render(
      <Tabs id="alphabet">
        <TabList manual>
          <Tab>A-tab</Tab>
          <Tab>B-tab</Tab>
          <Tab>C-tab</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>A-panel</TabPanel>
          <TabPanel>B-panel</TabPanel>
          <TabPanel>C-panel</TabPanel>
        </TabPanels>
      </Tabs>
    );

    fireEvent.click(getByText('B-tab'));

    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    id="alphabet"
  >
    <div
      role="tablist"
    >
      <button
        aria-controls="alphabet-0th-panel"
        aria-selected="false"
        id="alphabet-0th-tab"
        role="tab"
        tabindex="-1"
      >
        A-tab
      </button>
      <button
        aria-controls="alphabet-1th-panel"
        aria-selected="true"
        id="alphabet-1th-tab"
        role="tab"
        tabindex="0"
      >
        B-tab
      </button>
      <button
        aria-controls="alphabet-2th-panel"
        aria-selected="false"
        id="alphabet-2th-tab"
        role="tab"
        tabindex="-1"
      >
        C-tab
      </button>
    </div>
    <div
      aria-labelledby="alphabet-0th-tab"
      aria-selected="false"
      id="alphabet-0th-panel"
      role="tabpanel"
      style="display: none;"
      tabindex="0"
    >
      A-panel
    </div>
    <div
      aria-labelledby="alphabet-1th-tab"
      aria-selected="true"
      id="alphabet-1th-panel"
      role="tabpanel"
      style="display: inherit;"
      tabindex="0"
    >
      B-panel
    </div>
    <div
      aria-labelledby="alphabet-2th-tab"
      aria-selected="false"
      id="alphabet-2th-panel"
      role="tabpanel"
      style="display: none;"
      tabindex="0"
    >
      C-panel
    </div>
  </div>
</DocumentFragment>
`);
  });
});
