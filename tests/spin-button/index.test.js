import React, { useRef, useState } from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { SpinButton, UpButton, DownButton } from '../../src/spin-button';
import { UP, DOWN, HOME, END, PAGEUP, PAGEDOWN } from '../../src/keys';

afterEach(cleanup);

test('required props', () => {
  console.error = jest.fn();
  render(<SpinButton />);
  expect(console.error).toHaveBeenCalledTimes(4);
  const message = prop =>
    `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`SpinButton\`, but its value is \`undefined\`.
    in SpinButton`;
  expect(console.error).toHaveBeenCalledWith(message('aria-valuemax'));
  expect(console.error).toHaveBeenCalledWith(message('aria-valuemin'));
  expect(console.error).toHaveBeenCalledWith(message('aria-valuenow'));
  expect(console.error).toHaveBeenCalledWith(message('onChange'));
});

const max = 5;
const min = -5;
const spinbutton = 'spin-button';
const upbutton = 'up-button';
const downbutton = 'down-button';
const valuespan = 'value-span';

const Component = ({ initialValue = 0, ...props }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(initialValue);
  return (
    <SpinButton
      ref={ref}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      data-testid={spinbutton}
      onChange={setValue}
      {...props}
    >
      <UpButton data-testid={upbutton}>+</UpButton>
      <span data-testid={valuespan}>{value}</span>
      <DownButton data-testid={downbutton}>-</DownButton>
    </SpinButton>
  );
};

const snapshot = value => `
<span
  data-testid="value-span"
>
  ${value}
</span>
`;

describe('Up Button', () => {
  test('value in middle', () => {
    const value = 0;
    const { getByTestId } = render(<Component initialValue={value} />);

    const UpButton = getByTestId(upbutton);

    expect(UpButton.disabled).toBeFalsy();

    fireEvent.click(UpButton);

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value + 1));
  });

  test('value at min', () => {
    const { getByTestId } = render(<Component initialValue={min} />);

    const UpButton = getByTestId(upbutton);

    expect(UpButton.disabled).toBeFalsy();

    fireEvent.click(UpButton);

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min + 1));
  });

  test('value at max', () => {
    const { getByTestId } = render(<Component initialValue={max} />);

    const UpButton = getByTestId(upbutton);

    expect(UpButton.disabled).toBeTruthy();

    fireEvent.click(UpButton);

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max));
  });

  test('mousedown', () => {
    const onFocus = jest.fn();
    const { getByTestId } = render(<Component initialValue={0} onFocus={onFocus} />);
    const UpButton = getByTestId(upbutton);
    expect(onFocus).not.toHaveBeenCalled();
    fireEvent.mouseDown(UpButton);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});

describe('Down Button', () => {
  test('value in middle', () => {
    const value = 0;

    const { getByTestId } = render(<Component initialValue={value} />);

    const DownButton = getByTestId(downbutton);

    expect(DownButton.disabled).toBeFalsy();

    fireEvent.click(DownButton);

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value - 1));
  });

  test('value at min', () => {
    const { getByTestId } = render(<Component initialValue={min} />);

    const DownButton = getByTestId(downbutton);
    expect(DownButton.disabled).toBeTruthy();

    fireEvent.click(DownButton);

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min));
  });

  test('value at max', () => {
    const { getByTestId } = render(<Component initialValue={max} />);

    const DownButton = getByTestId(downbutton);
    expect(DownButton.disabled).toBeFalsy();

    fireEvent.click(DownButton);

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max - 1));
  });

  test('mousedown', () => {
    const onFocus = jest.fn();
    const { getByTestId } = render(<Component initialValue={0} onFocus={onFocus} />);
    const DownButton = getByTestId(downbutton);
    expect(onFocus).not.toHaveBeenCalled();
    fireEvent.mouseDown(DownButton);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});

describe('UP key', () => {
  test('value in middle', () => {
    const value = 0;
    const { getByTestId } = render(<Component initialValue={value} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'Up',
      keyCode: UP
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value + 1));
  });

  test('value at min', () => {
    const { getByTestId } = render(<Component initialValue={min} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'Up',
      keyCode: UP
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min + 1));
  });

  test('value at max', () => {
    const { getByTestId } = render(<Component initialValue={max} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'Up',
      keyCode: UP
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max));
  });
});

describe('DOWN key', () => {
  test('value in middle', () => {
    const value = 0;
    const { getByTestId } = render(<Component initialValue={value} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'DOWN',
      keyCode: DOWN
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value - 1));
  });

  test('value at min', () => {
    const { getByTestId } = render(<Component initialValue={min} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'DOWN',
      keyCode: DOWN
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min));
  });

  test('value at max', () => {
    const { getByTestId } = render(<Component initialValue={max} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'DOWN',
      keyCode: DOWN
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max - 1));
  });
});

describe('HOME key', () => {
  test('value in middle', () => {
    const value = 0;
    const { getByTestId } = render(<Component initialValue={value} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'HOME',
      keyCode: HOME
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min));
  });

  test('value at min', () => {
    const { getByTestId } = render(<Component initialValue={min} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'HOME',
      keyCode: HOME
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min));
  });

  test('value at max', () => {
    const { getByTestId } = render(<Component initialValue={max} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'HOME',
      keyCode: HOME
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min));
  });
});

describe('END key', () => {
  test('value in middle', () => {
    const value = 0;
    const { getByTestId } = render(<Component initialValue={value} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'END',
      keyCode: END
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max));
  });

  test('value at min', () => {
    const { getByTestId } = render(<Component initialValue={min} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'END',
      keyCode: END
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max));
  });

  test('value at max', () => {
    const { getByTestId } = render(<Component initialValue={max} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'END',
      keyCode: END
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max));
  });
});

describe('PAGEUP key', () => {
  test('default with value in middle', () => {
    const value = 0;
    const { getByTestId } = render(<Component initialValue={value} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEUP',
      keyCode: PAGEUP
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value + 1));
  });

  test('bigStep with value in middle', () => {
    const bigStep = 2,
      value = 0;
    const { getByTestId } = render(<Component initialValue={value} bigStep={bigStep} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEUP',
      keyCode: PAGEUP
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value + bigStep));
  });

  test('value at min', () => {
    const bigStep = 3;
    const { getByTestId } = render(<Component bigStep={bigStep} initialValue={min} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEUP',
      keyCode: PAGEUP
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min + bigStep));
  });

  test('value at max', () => {
    const { getByTestId } = render(<Component initialValue={max} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEUP',
      keyCode: PAGEUP
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max));
  });
});

describe('PAGEDOWN key', () => {
  test('default with value in middle', () => {
    const value = 0;
    const { getByTestId } = render(<Component initialValue={value} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEDOWN',
      keyCode: PAGEDOWN
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value - 1));
  });

  test('bigStep with value in middle', () => {
    const bigStep = 2,
      value = 0;
    const { getByTestId } = render(<Component initialValue={value} bigStep={bigStep} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEDOWN',
      keyCode: PAGEDOWN
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(value - bigStep));
  });

  test('value at min', () => {
    const { getByTestId } = render(<Component initialValue={min} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEDOWN',
      keyCode: PAGEDOWN
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(min));
  });

  test('value at max', () => {
    const bigStep = 3;
    const { getByTestId } = render(<Component bigStep={bigStep} initialValue={max} />);
    const component = getByTestId(spinbutton);

    fireEvent.keyDown(component, {
      key: 'PAGEDOWN',
      keyCode: PAGEDOWN
    });

    const newValue = getByTestId(valuespan);
    expect(newValue).toMatchInlineSnapshot(snapshot(max - bigStep));
  });
});
