import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { ListboxOption } from '../src/components/listbox';

afterEach(cleanup);

test('missing required props', () => {
  console.error = jest.fn();
  <ListboxOption />;
  expect(console.error).toHaveBeenCalledTimes(6);

  const strings = ['children', 'focused', 'id', 'onClick', 'selected', 'value'].map(
    name => `Warning: Failed prop type: The prop \`${name}\` is marked as required in \`ListboxOption\`, but its value is \`undefined\`.
    in ListboxOption`
  );

  expect(console.error).toHaveBeenCalledWith(strings[0]);
  expect(console.error).toHaveBeenCalledWith(strings[1]);
  expect(console.error).toHaveBeenCalledWith(strings[2]);
  expect(console.error).toHaveBeenCalledWith(strings[3]);
  expect(console.error).toHaveBeenCalledWith(strings[4]);
  expect(console.error).toHaveBeenCalledWith(strings[5]);
});

test('wrong props type', () => {
  console.error = jest.fn();
  <ListboxOption disabled={1} focused={2} id={3} onClick={4} selected={5} value={6}>
    {[]}
  </ListboxOption>;

  expect(console.error).toHaveBeenCalledTimes(7);
  const strings = [
    { name: 'disabled', expected: 'boolean' },
    { name: 'focused', expected: 'boolean' },
    { name: 'id', expected: 'string' },
    { name: 'onClick', expected: 'function' },
    { name: 'value', expected: 'string' }
  ].map(
    ({ name, expected }) =>
      `Warning: Failed prop type: Invalid prop \`${name}\` of type \`number\` supplied to \`ListboxOption\`, expected \`${expected}\`.
    in ListboxOption`
  );

  expect(console.error).toHaveBeenCalledWith(strings[0]);
  expect(console.error).toHaveBeenCalledWith(strings[1]);
  expect(console.error).toHaveBeenCalledWith(strings[2]);
  expect(console.error).toHaveBeenCalledWith(strings[3]);
  expect(console.error).toHaveBeenCalledWith(strings[4]);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: Invalid prop \`children\` supplied to \`ListboxOption\`.
    in ListboxOption`);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: Invalid prop \`selected\` supplied to \`ListboxOption\`.
    in ListboxOption`);
});
