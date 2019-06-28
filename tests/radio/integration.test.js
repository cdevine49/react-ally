import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { RadioGroup, RadioButton } from '../../src/components/radio-group';
import { END, HOME, DOWN, UP } from '../../src/keys';

afterEach(cleanup);

beforeEach(() => {
  console.error = jest.fn();
});

test('onChange', () => {
  const onChange = jest.fn();
  const value = 'Apple';
  const { getByValue } = render(
    <RadioGroup onChange={onChange}>
      <RadioButton value={value} />
      <RadioButton value="Banana" />
      <RadioButton value="Pear" />
    </RadioGroup>
  );
  const first = getByValue(value);
  fireEvent.click(first);
  expect(onChange).toHaveBeenCalledWith(value);
});

test('selected', () => {
  const value = 'Banana';
  const selected = value;
  const { getByValue } = render(
    <RadioGroup selected={selected}>
      <RadioButton value="Apple" />
      <RadioButton value={value} />
      <RadioButton value="Pear" />
    </RadioGroup>
  );
  const first = getByValue('Apple');
  const second = getByValue(value);
  const third = getByValue('Pear');

  expect(first.checked).toBe(false);
  expect(second.checked).toBe(true);
  expect(third.checked).toBe(false);
});

test('onFocus', () => {
  const apple = 'Apple';
  const banana = 'Banana';
  const { asFragment, getByValue, rerender } = render(
    <RadioGroup selected={banana}>
      <RadioButton value={apple} />
      <RadioButton value={banana} />
      <RadioButton value="Pear" />
    </RadioGroup>
  );

  const tabIndex = index => `
<DocumentFragment>
  <div
    role="radiogroup"
  >
    <div>
      <input
        tabindex="${index === 0 ? 0 : -1}"
        type="radio"
        value="Apple"
      />
      <label>
        Apple
      </label>
    </div>
    <div>
      <input
        checked=""
        tabindex="${index === 1 ? 0 : -1}"
        type="radio"
        value="Banana"
      />
      <label>
        Banana
      </label>
    </div>
    <div>
      <input
        tabindex="${index === 2 ? 0 : -1}"
        type="radio"
        value="Pear"
      />
      <label>
        Pear
      </label>
    </div>
  </div>
</DocumentFragment>
`;

  expect(asFragment()).toMatchInlineSnapshot(tabIndex(0));

  const first = getByValue(apple);
  const second = getByValue(banana);

  fireEvent.focus(second);
  expect(asFragment()).toMatchInlineSnapshot(tabIndex(1));
  fireEvent.focus(first);
  expect(asFragment()).toMatchInlineSnapshot(tabIndex(0));
});
