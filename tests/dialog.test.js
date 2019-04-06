import React, { useRef } from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { Dialog } from '../src/';
import { ESC, TAB } from '../src/keys';

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

test('missing required props', () => {
  console.error = jest.fn();
  try {
    render(<Dialog />);
  } catch (_) {
    try {
      // jest.runAllTimers();
    } catch (_) {}
  }
  const message = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`Dialog\`, but its value is \`undefined\`.
    in Dialog`;
  expect(console.error).toHaveBeenCalledWith(message('close'));
  expect(console.error).toHaveBeenCalledWith(message('firstTabbableElementRef'));
  expect(console.error).toHaveBeenCalledWith(message('id'));
  expect(console.error).toHaveBeenCalledWith(message('isOpen'));
});

const fakeRef = {
  current: {
    addEventListener: () => {},
    focus: () => {},
    removeEventListener: () => {}
  }
};

const Component = ({
  children,
  close,
  firstTabbableElementRef = fakeRef,
  isOpen,
  lastTabbableElementRef = fakeRef,
  open,
  ...props
}) => {
  const wrapperRef = useRef(null);
  const returnFocusRef = useRef(null);
  return (
    <div data-testid="root">
      <button ref={returnFocusRef} onClick={open}>
        Open Button
      </button>
      <Dialog
        ref={wrapperRef}
        close={close}
        firstTabbableElementRef={firstTabbableElementRef}
        isOpen={isOpen}
        lastTabbableElementRef={lastTabbableElementRef}
        returnFocus={returnFocusRef}
        {...props}
      >
        {children}
      </Dialog>
    </div>
  );
};

test('missing ref', () => {
  expect(() => {
    render(<Dialog />);
  }).toThrowErrorMatchingInlineSnapshot(`"Dialog requires a ref"`);
});

test('closed', () => {
  const { asFragment, unmount } = render(<Component isOpen={false} />, {
    container: document.body
  });

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    data-testid="root"
  >
    <button>
      Open Button
    </button>
  </div>
</DocumentFragment>
`);

  unmount();
});

test('open', () => {
  const { asFragment, unmount } = render(<Component isOpen={true}>{'child'}</Component>, {
    container: document.body
  });

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <div
      style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"
    >
      <div
        aria-describedby=""
        aria-labelledby=""
        aria-modal="true"
        id="test-dialog"
        role="dialog"
        tabindex="-1"
      >
        child
      </div>
    </div>
  </div>
  <div
    aria-hidden="true"
    data-testid="root"
  >
    <button>
      Open Button
    </button>
  </div>
</DocumentFragment>
`);

  unmount();
});

test('click overlay', () => {
  const close = jest.fn();
  const overlayId = 'overlay-testid';
  const { getByTestId, unmount } = render(
    <Component isOpen={true} close={close} overlayProps={{ 'data-testid': overlayId }} />,
    {
      container: document.body
    }
  );

  expect(close).not.toHaveBeenCalled();
  fireEvent.click(getByTestId(overlayId));
  expect(close).toHaveBeenCalled();

  unmount();
});

test('click overlay when closeOnOverlayClick is false', () => {
  const close = jest.fn();
  const overlayId = 'overlay-testid';
  const { getByTestId, unmount } = render(
    <Component
      isOpen={true}
      close={close}
      closeOnOverlayClick={false}
      overlayProps={{ 'data-testid': overlayId }}
    />,
    {
      container: document.body
    }
  );

  expect(close).not.toHaveBeenCalled();
  fireEvent.click(getByTestId(overlayId));
  expect(close).not.toHaveBeenCalled();

  unmount();
});

test('Escape', () => {
  const close = jest.fn();
  const testId = 'testid';
  const { getByTestId, unmount } = render(
    <Component isOpen={true} close={close} closeOnOverlayClick={false} data-testid={testId} />,
    {
      container: document.body
    }
  );

  expect(close).not.toHaveBeenCalled();
  fireEvent.keyDown(getByTestId(testId), {
    keyCode: ESC
  });
  expect(close).toHaveBeenCalled();

  unmount();
});

test('firstTabbableElementRef get initial focus by default', () => {
  const onFocus = jest.fn();
  const Wrapper = () => {
    const firstTabbableElementRef = useRef(null);
    return (
      <Component isOpen firstTabbableElementRef={firstTabbableElementRef}>
        <button ref={firstTabbableElementRef} onFocus={onFocus} />
      </Component>
    );
  };
  jest.useFakeTimers();
  render(<Wrapper />, {
    container: document.body
  });
  jest.runAllTimers();
  expect(onFocus).toHaveBeenCalled();
});

test('initialFocusElementRef gets focus if present', () => {
  const onFocus = jest.fn();
  const Wrapper = () => {
    const firstTabbableElementRef = useRef(null);
    const lastTabbableElementRef = useRef(null);
    return (
      <Component
        isOpen
        firstTabbableElementRef={firstTabbableElementRef}
        lastTabbableElementRef={lastTabbableElementRef}
        initialFocusElementRef={lastTabbableElementRef}
      >
        <button ref={firstTabbableElementRef} />
        <button ref={lastTabbableElementRef} onFocus={onFocus} />
      </Component>
    );
  };
  jest.useFakeTimers();
  render(<Wrapper />, {
    container: document.body
  });
  jest.runAllTimers();
  expect(onFocus).toHaveBeenCalled();
});

test('shift+tab from first tabbable element', () => {
  const onFocus = jest.fn();
  const firstId = 'first';
  const Wrapper = () => {
    const firstTabbableElementRef = useRef(null);
    const lastTabbableElementRef = useRef(null);
    return (
      <Component
        isOpen
        firstTabbableElementRef={firstTabbableElementRef}
        lastTabbableElementRef={lastTabbableElementRef}
      >
        <button data-testid={firstId} ref={firstTabbableElementRef} />
        <button ref={lastTabbableElementRef} onFocus={onFocus} />
      </Component>
    );
  };
  const { getByTestId } = render(<Wrapper />, {
    container: document.body
  });

  expect(onFocus).not.toHaveBeenCalled();
  fireEvent.keyDown(getByTestId(firstId), {
    keyCode: TAB,
    shiftKey: true
  });
  expect(onFocus).toHaveBeenCalled();
});

test('tab from last tabbable element', () => {
  const onFocus = jest.fn();
  const lastId = 'last';
  const Wrapper = () => {
    const firstTabbableElementRef = useRef(null);
    const lastTabbableElementRef = useRef(null);
    return (
      <Component
        isOpen
        firstTabbableElementRef={firstTabbableElementRef}
        lastTabbableElementRef={lastTabbableElementRef}
      >
        <button ref={firstTabbableElementRef} onFocus={onFocus} />
        <button data-testid={lastId} ref={lastTabbableElementRef} />
      </Component>
    );
  };
  const { getByTestId } = render(<Wrapper />, {
    container: document.body
  });

  onFocus.mockClear();
  fireEvent.keyDown(getByTestId(lastId), {
    keyCode: TAB
  });
  expect(onFocus).toHaveBeenCalled();
});

test('dialog click', () => {
  const onClick = jest.fn();
  const testId = 'testid';
  const { getByTestId } = render(<Component isOpen data-testid={testId} onClick={onClick} />, {
    container: document.body
  });

  expect(onClick).not.toHaveBeenCalled();
  fireEvent.click(getByTestId(testId));
  expect(onClick).toHaveBeenCalled();
});

test('dialog keydown', () => {
  const onKeyDown = jest.fn();
  const testId = 'testid';
  const { getByTestId } = render(<Component isOpen data-testid={testId} onKeyDown={onKeyDown} />, {
    container: document.body
  });

  const dialog = getByTestId(testId);
  expect(onKeyDown).not.toHaveBeenCalled();
  fireEvent.keyDown(dialog, {
    keyCode: 13
  });
  expect(onKeyDown).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(dialog, {
    keyCode: ESC
  });
  expect(onKeyDown).toHaveBeenCalledTimes(2);
});

test('overlayBackgroundColor', () => {
  const { asFragment, unmount } = render(
    <Component isOpen={true} overlayBackgroundColor={'#000000'} />,
    {
      container: document.body
    }
  );

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <div
      style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgb(0, 0, 0);"
    >
      <div
        aria-describedby=""
        aria-labelledby=""
        aria-modal="true"
        id="test-dialog"
        role="dialog"
        tabindex="-1"
      />
    </div>
  </div>
  <div
    aria-hidden="true"
    data-testid="root"
  >
    <button>
      Open Button
    </button>
  </div>
</DocumentFragment>
`);

  unmount();
});
