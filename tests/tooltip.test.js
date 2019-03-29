import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Section, Heading } from '../src/sectioning';
import { Tooltip } from '../src/tooltip';

afterEach(cleanup);

test('required props', () => {
  console.error = jest.fn();
  render(<Tooltip />);
  expect(console.error).toHaveBeenCalledTimes(3);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`children\` is marked as required in \`Tooltip\`, but its value is \`undefined\`.
    in Tooltip`);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`content\` is marked as required in \`Tooltip\`, but its value is \`undefined\`.
    in Tooltip`);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: The prop \`id\` is marked as required in \`Tooltip\`, but its value is \`undefined\`.
    in Tooltip`);
});

const buttonText = 'Hover or Focus Me';

const snapshot = (visible, style = {}) => {
  delete style.display;
  const styleString = Object.keys(style)
    .reduce((acc, key) => {
      acc += `${key}: ${style[key]}; `;
      return acc;
    }, '')
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
  return `
<DocumentFragment>
  <button
    aria-describedby="my-id"
  >
    ${buttonText}
  </button>
  <span
    aria-hidden="${!visible}"
    id="my-id"
    role="tooltip"
    style="${styleString}display: ${visible ? 'inherit' : 'none'};"
  >
    Look at me
  </span>
</DocumentFragment>
`;
};

test('default', () => {
  const { asFragment } = render(
    <Tooltip id="my-id" content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );
  expect(asFragment()).toMatchInlineSnapshot(snapshot(false));
});

test('focused', () => {
  const { asFragment, getByText } = render(
    <Tooltip id="my-id" content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );
  fireEvent.focus(getByText(buttonText));
  expect(asFragment()).toMatchInlineSnapshot(snapshot(true));
});

test('blurred', () => {
  const { asFragment, getByText } = render(
    <Tooltip id="my-id" content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );
  const button = getByText(buttonText);
  fireEvent.focus(button);
  fireEvent.blur(button);
  expect(asFragment()).toMatchInlineSnapshot(snapshot(false));
});

test('mouseEnter', () => {
  const { asFragment, getByText } = render(
    <Tooltip id="my-id" content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );
  fireEvent.mouseEnter(getByText(buttonText));
  expect(asFragment()).toMatchInlineSnapshot(snapshot(true));
});

test('mouseLeave', () => {
  const { asFragment, getByText } = render(
    <Tooltip id="my-id" content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );
  const button = getByText(buttonText);
  fireEvent.mouseEnter(button);
  fireEvent.mouseLeave(button);
  expect(asFragment()).toMatchInlineSnapshot(snapshot(false));
});

test('focused and mouseLeave', () => {
  const { asFragment, getByText } = render(
    <Tooltip id="my-id" content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );
  const button = getByText(buttonText);
  fireEvent.focus(button);
  fireEvent.mouseEnter(button);
  fireEvent.mouseLeave(button);
  expect(asFragment()).toMatchInlineSnapshot(snapshot(true));
});

test('mouseEnter and blur', () => {
  const { asFragment, getByText } = render(
    <Tooltip id="my-id" content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );
  const button = getByText(buttonText);
  fireEvent.mouseEnter(button);
  fireEvent.focus(button);
  fireEvent.blur(button);
  expect(asFragment()).toMatchInlineSnapshot(snapshot(true));
});

test('content accepts style', () => {
  const style = { backgroundColor: 'blue' };
  const { asFragment } = render(
    <Tooltip id="my-id" style={style} content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );

  expect(asFragment()).toMatchInlineSnapshot(snapshot(false, style));
});

test('style cannot override display', () => {
  const { asFragment } = render(
    <Tooltip id="my-id" style={{ display: 'block' }} content={<span>Look at me</span>}>
      <button>{buttonText}</button>
    </Tooltip>
  );

  expect(asFragment()).toMatchInlineSnapshot(snapshot(false));
});
