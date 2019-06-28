import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Combobox } from '../src/components/combobox';

afterEach(cleanup);

const FRUITS_AND_VEGGIES = [
  'Apple',
  'Artichoke',
  'Asparagus',
  'Banana',
  'Beets',
  'Bell pepper',
  'Broccoli',
  'Brussels sprout',
  'Cabbage',
  'Carrot',
  'Cauliflower',
  'Celery',
  'Chard',
  'Chicory',
  'Corn',
  'Cucumber',
  'Daikon',
  'Date',
  'Edamame',
  'Eggplant',
  'Elderberry',
  'Fennel',
  'Fig',
  'Garlic',
  'Grape',
  'Honeydew melon',
  'Iceberg lettuce',
  'Jerusalem artichoke',
  'Kale',
  'Kiwi',
  'Leek',
  'Lemon',
  'Mango',
  'Mangosteen',
  'Melon',
  'Mushroom',
  'Nectarine',
  'Okra',
  'Olive',
  'Onion',
  'Orange',
  'Parship',
  'Pea',
  'Pear',
  'Pineapple',
  'Potato',
  'Pumpkin',
  'Quince',
  'Radish',
  'Rhubarb',
  'Shallot',
  'Spinach',
  'Squash',
  'Strawberry',
  'Sweet potato',
  'Tomato',
  'Turnip',
  'Ugli fruit',
  'Victoria plum',
  'Watercress',
  'Watermelon',
  'Yam',
  'Zucchini'
];

test('missing required props', () => {
  console.error = jest.fn();
  const component = <Combobox />;
  expect(console.error).toHaveBeenCalledTimes(4);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`children\` is marked as required in \`Combobox\`, but its value is \`undefined\`.
    in Combobox`);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`id\` is marked as required in \`Combobox\`, but its value is \`undefined\`.
    in Combobox`);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`label\` is marked as required in \`Combobox\`, but its value is \`undefined\`.
    in Combobox`);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`value\` is marked as required in \`Combobox\`, but its value is \`undefined\`.
    in Combobox`);
});

describe('manual', () => {
  test('initial render', () => {
    const label = 'Fruits and Veggies';
    const value = '';
    const component = (
      <Combobox id="healthy-foods" label={label} value={value}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('value', () => {
    const label = 'Fruits and Veggies';
    const component = (
      <Combobox id="healthy-foods" label={label} value={'A'}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const leComponent = (
      <Combobox id="healthy-foods" label={label} value={'le'}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { asFragment: secondAsFragment } = render(leComponent);
    expect(secondAsFragment()).toMatchSnapshot();
  });

  test('input changes', () => {
    const label = 'Fruits and Veggies';
    const onChange = jest.fn();
    const value = '';
    const component = (
      <Combobox id="healthy-foods" label={label} onChange={onChange} value={value}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { getByValue, rerender } = render(component);
    const input = getByValue(value);
    const newValue = 'B';
    fireEvent.change(input, { target: { value: newValue } });
    expect(onChange).toHaveBeenCalledWith(newValue);
  });

  describe('listbox displayed', () => {
    test('down arrow', () => {
      const label = 'Fruits and Veggies';
      const value = 'A';
      const component = (
        <Combobox id="healthy-foods" label={label} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue, rerender } = render(component);
      const input = getByValue(value);

      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();

      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();

      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();

      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
    });

    test('up arrow', () => {
      const label = 'Fruits and Veggies';
      const value = 'A';
      const component = (
        <Combobox id="healthy-foods" label={label} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue, rerender } = render(component);
      const input = getByValue(value);

      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();

      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();

      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();

      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('listbox not displayed', () => {
    test('down arrow', () => {
      const label = 'Fruits and Veggies';
      const value = '';
      const component = (
        <Combobox id="healthy-foods" label={label} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue } = render(component);
      const input = getByValue(value);
      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      expect(asFragment()).toMatchSnapshot();
    });

    test('up arrow', () => {
      const label = 'Fruits and Veggies';
      const value = '';
      const component = (
        <Combobox id="healthy-foods" label={label} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue } = render(component);
      const input = getByValue(value);
      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('escape', () => {
    const label = 'Fruits and Veggies';
    const onChange = jest.fn();
    let value = 'A';
    const component = (
      <Combobox id="healthy-foods" label={label} onChange={onChange} value={value}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { getByValue } = render(component);
    const input = getByValue(value);

    fireEvent.keyDown(input, {
      key: 'Escape',
      keyCode: 27
    });
    expect(onChange).toBeCalledWith('');
  });
});

describe('automatic', () => {
  const automatic = 'automatic';
  test('initial render', () => {
    const label = 'Fruits and Veggies';
    const value = '';
    const component = (
      <Combobox id="healthy-foods" label={label} selection={automatic} value={value}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();
  });

  test('value', () => {
    const label = 'Fruits and Veggies';
    const component = (
      <Combobox id="healthy-foods" label={label} selection={automatic} value={'A'}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { asFragment } = render(component);
    expect(asFragment()).toMatchSnapshot();

    const leComponent = (
      <Combobox id="healthy-foods" label={label} selection={automatic} value={'le'}>
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { asFragment: secondAsFragment } = render(leComponent);
    expect(secondAsFragment()).toMatchSnapshot();
  });

  test('input changes', () => {
    const label = 'Fruits and Veggies';
    const onChange = jest.fn();
    const value = '';
    const component = (
      <Combobox
        id="healthy-foods"
        label={label}
        onChange={onChange}
        selection={automatic}
        value={value}
      >
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { getByValue } = render(component);
    const input = getByValue(value);
    const newValue = 'B';
    fireEvent.change(input, { target: { value: newValue } });
    expect(onChange).toHaveBeenCalledWith(newValue);
  });

  describe('listbox displayed', () => {
    test('down arrow', () => {
      const label = 'Fruits and Veggies';
      const value = 'A';
      const component = (
        <Combobox id="healthy-foods" label={label} selection={automatic} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue, rerender } = render(component);
      const input = getByValue(value);
      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
    });

    test('up arrow', () => {
      const label = 'Fruits and Veggies';
      const value = 'A';
      const component = (
        <Combobox id="healthy-foods" label={label} selection={automatic} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue, rerender } = render(component);
      const input = getByValue(value);
      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      rerender(component);
      expect(asFragment()).toMatchSnapshot();
    });

    test('enter', () => {
      const label = 'Fruits and Veggies';
      const onChange = jest.fn();
      let value = 'A';
      const component = (
        <Combobox
          id="healthy-foods"
          label={label}
          onChange={onChange}
          selection={automatic}
          value={value}
        >
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue, rerender } = render(component);
      const input = getByValue(value);
      fireEvent.keyDown(input, {
        key: 'Enter',
        keyCode: 13
      });
      rerender(component);
      expect(onChange).toBeCalledWith(FRUITS_AND_VEGGIES[0]);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('listbox not displayed', () => {
    test('down arrow', () => {
      const label = 'Fruits and Veggies';
      const value = '';
      const component = (
        <Combobox id="healthy-foods" label={label} selection={automatic} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue } = render(component);
      const input = getByValue(value);
      fireEvent.keyDown(input, {
        key: 'Down Arrow',
        keyCode: 40
      });
      expect(asFragment()).toMatchSnapshot();
    });
    test('up arrow', () => {
      const label = 'Fruits and Veggies';
      const value = '';
      const component = (
        <Combobox id="healthy-foods" label={label} selection={automatic} value={value}>
          {FRUITS_AND_VEGGIES}
        </Combobox>
      );
      const { asFragment, getByValue } = render(component);
      const input = getByValue(value);
      fireEvent.keyDown(input, {
        key: 'Up Arrow',
        keyCode: 38
      });
      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('escape', () => {
    const label = 'Fruits and Veggies';
    const onChange = jest.fn();
    let value = 'A';
    const component = (
      <Combobox
        id="healthy-foods"
        label={label}
        onChange={onChange}
        selection={automatic}
        value={value}
      >
        {FRUITS_AND_VEGGIES}
      </Combobox>
    );
    const { getByValue } = render(component);
    const input = getByValue(value);
    fireEvent.keyDown(input, {
      key: 'Escape',
      keyCode: 27
    });
    expect(onChange).toBeCalledWith('');
  });
});
