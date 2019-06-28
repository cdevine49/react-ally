import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { RadioGroup } from '../../src/components/radio-group';

afterEach(cleanup);

test('required props', () => {
  console.error = jest.fn();
  render(<RadioGroup />);
  expect(console.error).toHaveBeenCalledTimes(2);
  const message = prop =>
    `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`RadioGroup\`, but its value is \`undefined\`.
    in RadioGroup`;
  expect(console.error).toHaveBeenCalledWith(message('onChange'));
  expect(console.error).toHaveBeenCalledWith(message('selected'));
});

test('children', () => {
  const onChange = jest.fn();
  const Child = ({ testid, selected, setActiveIndex, ...props }) => (
    <input data-testid={testid} {...props} type="radio" onFocus={setActiveIndex} value={selected} />
  );

  const { asFragment, getByTestId } = render(
    <RadioGroup onChange={onChange} selected="oh me oh my">
      <Child testid="first" />
      <Child testid="second" />
    </RadioGroup>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    role="radiogroup"
  >
    <input
      data-testid="first"
      tabindex="0"
      type="radio"
      value="oh me oh my"
    />
    <input
      data-testid="second"
      tabindex="-1"
      type="radio"
      value="oh me oh my"
    />
  </div>
</DocumentFragment>
`);
  const first = getByTestId('first');
  fireEvent.click(first);
  expect(onChange).toHaveBeenCalled();

  onChange.mockClear();
  const second = getByTestId('second');
  fireEvent.click(second);
  expect(onChange).toHaveBeenCalled();

  fireEvent.focus(second);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    role="radiogroup"
  >
    <input
      data-testid="first"
      tabindex="-1"
      type="radio"
      value="oh me oh my"
    />
    <input
      data-testid="second"
      tabindex="0"
      type="radio"
      value="oh me oh my"
    />
  </div>
</DocumentFragment>
`);
});
