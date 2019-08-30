import React from 'react';
import {
  cleanup,
  render,
  fireEvent
} from 'react-testing-library';
import snapshotDiff from 'snapshot-diff';
import { MenuButton } from '../../src/menu';

expect.addSnapshotSerializer(
  snapshotDiff.getSnapshotDiffSerializer()
);

const props = {
  active: false,
  id: 'button-id',
  menuId: 'menu-id',
  setFocusIndex: jest.fn(),
  toggle: jest.fn()
};

const missing = prop => `Warning: Failed prop type: The prop \`${prop}\` is marked as required in \`MenuButton\`, but its value is \`undefined\`.
    in MenuButton`;

const invalid = (
  prop,
  received,
  expected
) => `Warning: Failed prop type: Invalid prop \`${prop}\` of type \`${received}\` supplied to \`MenuButton\`, expected \`${expected}\`.
    in MenuButton`;

const diff = (prop, first, second) => {
  const { asFragment: firstFragment } = render(
    <MenuButton {...props} {...{ [prop]: first }} />
  );
  const { asFragment: secondFragment } = render(
    <MenuButton {...props} {...{ [prop]: second }} />
  );
  return snapshotDiff(firstFragment(), secondFragment());
};

test('active is required', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} active={undefined} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(missing('active'));
});

test('active must be a boolean', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} active={() => {}} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    invalid('active', 'function', 'boolean')
  );
});

test('active prop sets aria-expanded', () => {
  expect(diff('active', false, true)).toMatchInlineSnapshot(`
Snapshot Diff:
- First value
+ Second value

  <DocumentFragment>
    <button
      aria-controls="menu-id"
-     aria-expanded="false"
+     aria-expanded="true"
      aria-haspopup="true"
      id="button-id"
    />
  </DocumentFragment>
`);
});

test('id is required', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} id={undefined} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(missing('id'));
});

test('id must be a string', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} id={1} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    invalid('id', 'number', 'string')
  );
});

test('id prop sets id', () => {
  expect(diff('id', 'first-id', 'second-id'))
    .toMatchInlineSnapshot(`
Snapshot Diff:
- First value
+ Second value

  <DocumentFragment>
    <button
      aria-controls="menu-id"
      aria-expanded="false"
      aria-haspopup="true"
-     id="first-id"
+     id="second-id"
    />
  </DocumentFragment>
`);
});

test('menuId is required', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} menuId={undefined} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(missing('menuId'));
});

test('menuId must be a string', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} menuId={false} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    invalid('menuId', 'boolean', 'string')
  );
});

test('menuid prop sets aria-controls', () => {
  expect(diff('menuId', 'first-menu-id', 'second-menu-id'))
    .toMatchInlineSnapshot(`
Snapshot Diff:
- First value
+ Second value

  <DocumentFragment>
    <button
-     aria-controls="first-menu-id"
+     aria-controls="second-menu-id"
      aria-expanded="false"
      aria-haspopup="true"
      id="button-id"
    />
  </DocumentFragment>
`);
});

test('setFocusIndex is required', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} setFocusIndex={undefined} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    missing('setFocusIndex')
  );
});

test('setFocusIndex must be a string', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} setFocusIndex={false} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(
    invalid('setFocusIndex', 'boolean', 'function')
  );
});

test('toggle is required', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} toggle={undefined} />);
  expect(console.error).toHaveBeenCalledTimes(1);
  expect(console.error).toHaveBeenCalledWith(missing('toggle'));
});

test('toggle must be a string', () => {
  console.error = jest.fn();
  render(<MenuButton {...props} toggle={false} />);
  // Called an extra time because react adds error
  // for event listeners that aren't functions
  expect(console.error).toHaveBeenCalledTimes(2);
  expect(console.error).toHaveBeenCalledWith(
    invalid('toggle', 'boolean', 'function')
  );
});

test('with required props', () => {
  const { asFragment } = render(<MenuButton {...props} />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-controls="menu-id"
    aria-expanded="false"
    aria-haspopup="true"
    id="button-id"
  />
</DocumentFragment>
`);
});

test('cannot override default arias', () => {
  const { asFragment } = render(
    <MenuButton
      {...props}
      aria-controls="blah"
      aria-expanded="true"
      aria-haspopup="false"
    />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-controls="menu-id"
    aria-expanded="false"
    aria-haspopup="true"
    id="button-id"
  />
</DocumentFragment>
`);
});

test('button accepts other props', () => {
  const { asFragment } = render(
    <MenuButton
      {...props}
      className="button-class"
      data-event="click"
    >
      Click Me
    </MenuButton>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-controls="menu-id"
    aria-expanded="false"
    aria-haspopup="true"
    class="button-class"
    data-event="click"
    id="button-id"
  >
    Click Me
  </button>
</DocumentFragment>
`);
});
