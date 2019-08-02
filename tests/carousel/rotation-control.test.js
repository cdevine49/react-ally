import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { RotationControl } from '../../src/carousel';
import * as context from '../../src/carousel/context';

afterEach(cleanup);

const setContext = ctx => {
  jest.spyOn(context, 'useCarouselContext').mockImplementation(() => ctx);
};

beforeEach(() => {
  setContext({ rotating: false });
});

describe('children', () => {
  test('as a function', () => {
    const Component = () => (
      <RotationControl>{rotating => (rotating ? 'Stop' : 'Start')}</RotationControl>
    );
    setContext({ rotating: false });
    const { asFragment, rerender } = render(<Component />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
  >
    Start
  </button>
</DocumentFragment>
`);

    setContext({ rotating: true });
    rerender(<Component />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="true"
  >
    Stop
  </button>
</DocumentFragment>
`);
  });

  test('not as a function', () => {
    const { asFragment } = render(<RotationControl>Hello World</RotationControl>);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
  >
    Hello World
  </button>
</DocumentFragment>
`);
  });
});

describe('aria-label', () => {
  test('as a function', () => {
    const Component = () => (
      <RotationControl aria-label={rotating => (rotating ? 'Stop' : 'Start')} />
    );
    setContext({ rotating: false });
    const { asFragment, rerender } = render(<Component />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Start"
    aria-pressed="false"
  />
</DocumentFragment>
`);

    setContext({ rotating: true });
    rerender(<Component />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Stop"
    aria-pressed="true"
  />
</DocumentFragment>
`);
  });

  test('not as a function', () => {
    const { asFragment } = render(<RotationControl aria-label="Hello World" />);
    expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-label="Hello World"
    aria-pressed="false"
  />
</DocumentFragment>
`);
  });
});

test('rotating', () => {
  setContext({ rotating: true });
  const { asFragment, rerender } = render(<RotationControl />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="true"
  />
</DocumentFragment>
`);

  setContext({ rotating: false });
  rerender(<RotationControl />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
  />
</DocumentFragment>
`);
});

test('setRotating', () => {
  const setRotating = jest.fn();
  setContext({ rotating: false, setRotating });
  const { getByText } = render(<RotationControl>Hello World</RotationControl>);

  fireEvent.click(getByText('Hello World'));
  expect(setRotating).toHaveBeenCalledTimes(1);

  setContext({ rotating: true, setRotating });
  fireEvent.click(getByText('Hello World'));
  expect(setRotating).toHaveBeenCalledTimes(2);
});

test('overriding onClick', () => {
  console.error = jest.fn();
  render(<RotationControl onClick={() => {}} />);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: \`RotationControl\` has a default \`onClick\` prop of value \`a function that toggles rotation\` that cannot be overridden.
    in RotationControl`);
});

test('addable props', () => {
  const { asFragment } = render(<RotationControl id="hello-world" className="goodbye-moon" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="false"
    class="goodbye-moon"
    id="hello-world"
  />
</DocumentFragment>
`);
});

test('non-addable props', () => {
  const setRotating = jest.fn();
  setContext({ rotating: true, setRotating });
  const onClick = jest.fn();
  const { asFragment, getByText } = render(
    <RotationControl aria-pressed={false} onClick={onClick}>
      Hello World
    </RotationControl>
  );
  fireEvent.click(getByText('Hello World'));
  expect(onClick).not.toHaveBeenCalled();
  expect(setRotating).toHaveBeenCalled();
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <button
    aria-pressed="true"
  >
    Hello World
  </button>
</DocumentFragment>
`);
});
