import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { RadioButton } from '../../src/components/radio-group';

afterEach(cleanup);

test('required props', () => {
  console.error = jest.fn();
  render(<RadioButton />);
  expect(console.error).toHaveBeenCalledTimes(3);
  const message = prop =>
    `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`RadioButton\`, but its value is \`undefined\`.
    in RadioButton`;
  expect(console.error).toHaveBeenCalledWith(message('id'));
  expect(console.error).toHaveBeenCalledWith(message('label'));
  expect(console.error).toHaveBeenCalledWith(message('value'));
});

test('id', () => {
  const { asFragment } = render(<RadioButton id="my-id" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <input
      checked=""
      id="my-id"
      type="radio"
      value=""
    />
    <label
      for="my-id"
    />
  </div>
</DocumentFragment>
`);
});

test('label', () => {
  const { asFragment } = render(<RadioButton label="my-label" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <input
      checked=""
      type="radio"
      value=""
    />
    <label>
      my-label
    </label>
  </div>
</DocumentFragment>
`);
});

test('labelProps', () => {
  const { asFragment } = render(
    <RadioButton labelProps={{ id: 'label-id', className: 'label-class' }} />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <input
      checked=""
      type="radio"
      value=""
    />
    <label
      class="label-class"
      id="label-id"
    />
  </div>
</DocumentFragment>
`);
});

test('onChange', () => {
  const value = 'my-value';
  const onChange = jest.fn();
  const { getByTestId } = render(
    <RadioButton
      data-testid="testid"
      id="id"
      labelProps={{ 'data-testid': 'label-testid' }}
      onChange={onChange}
      value={value}
    />
  );

  const input = getByTestId('testid');
  fireEvent.click(input);
  expect(onChange).toBeCalledWith(value);

  onChange.mockClear();
  const label = getByTestId('label-testid');
  fireEvent.click(label);
  expect(onChange).toBeCalledWith(value);
});

test('selected', () => {
  const value = 'value';
  const testid = 'testid';
  const Component = ({ selected }) => (
    <RadioButton data-testid={testid} value={value} selected={selected} />
  );
  const { getByTestId, rerender } = render(<Component selected="blah" />);
  expect(getByTestId(testid).checked).toBe(false);
  rerender(<Component selected={value} />);
  expect(getByTestId(testid).checked).toBe(true);
});

test('value', () => {
  const { asFragment, rerender } = render(<RadioButton value="my-value" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <input
      type="radio"
      value="my-value"
    />
    <label>
      my-value
    </label>
  </div>
</DocumentFragment>
`);

  rerender(<RadioButton label="my-label" value="my-value" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div>
    <input
      type="radio"
      value="my-value"
    />
    <label>
      my-label
    </label>
  </div>
</DocumentFragment>
`);
});

test('wrapperProps', () => {
  const { asFragment } = render(
    <RadioButton wrapperProps={{ id: 'my-id', className: 'my-class' }} />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="my-class"
    id="my-id"
  >
    <input
      checked=""
      type="radio"
      value=""
    />
    <label />
  </div>
</DocumentFragment>
`);
});
