import React, { useRef } from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { DialogContent } from '../../src';
import { Label } from '../../src/dialog/label';
import { Description } from '../../src/dialog/description';

jest.mock('../../src/focus-trap/container', () => ({
  FocusTrap: props => <div data-focuslast={props.focusLast} data-test-id="focus-trap" {...props} />
}));

jest.mock('body-scroll-lock', () => ({
  disableBodyScroll: jest.fn(),
  enableBodyScroll: jest.fn()
}));

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

const Wrapper = props => {
  const ref = useRef(null);
  return <DialogContent ref={ref} {...props} />;
};

test('missing id', () => {
  const error = `Warning: Failed prop type: The prop \`id\` is marked as required in \`DialogContent\`, but its value is \`undefined\`.
    in DialogContent (created by Wrapper)
    in Wrapper`;
  render(<Wrapper />, { container: document.body });
  expect(console.error).toHaveBeenCalledWith(error);
});

test('missing ref', () => {
  const component = <DialogContent />;
  expect(() => render(component)).toThrowErrorMatchingInlineSnapshot(
    `"DialogContent requires a ref"`
  );
});

test('default', () => {
  const { asFragment } = render(<Wrapper id="wrapper" />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"
  >
    <div
      aria-describedby=""
      aria-labelledby=""
      aria-modal="true"
      data-focuslast="false"
      data-test-id="focus-trap"
      id="wrapper"
      role="dialog"
    />
  </div>
</DocumentFragment>
`);
});

test('label', () => {
  const { asFragment } = render(
    <Wrapper id="wrapper">
      <Label>Heading</Label>
    </Wrapper>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"
  >
    <div
      aria-describedby=""
      aria-labelledby="wrapper-label"
      aria-modal="true"
      data-focuslast="false"
      data-test-id="focus-trap"
      id="wrapper"
      role="dialog"
    >
      <h2
        id="wrapper-label"
      >
        Heading
      </h2>
    </div>
  </div>
</DocumentFragment>
`);
});

test('description', () => {
  const { asFragment } = render(
    <Wrapper id="wrapper">
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </Description>
    </Wrapper>
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"
  >
    <div
      aria-describedby="wrapper-description"
      aria-labelledby=""
      aria-modal="true"
      data-focuslast="false"
      data-test-id="focus-trap"
      id="wrapper"
      role="dialog"
    >
      <div
        id="wrapper-description"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      </div>
    </div>
  </div>
</DocumentFragment>
`);
});

test('focusLast', () => {
  const { asFragment } = render(<Wrapper id="wrapper" focusLast />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"
  >
    <div
      aria-describedby=""
      aria-labelledby=""
      aria-modal="true"
      data-focuslast="true"
      data-test-id="focus-trap"
      id="wrapper"
      role="dialog"
    />
  </div>
</DocumentFragment>
`);
});

test('onClick', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<Wrapper data-testid="wrapper" id="wrapper" onClick={onClick} />);
  const wrapper = getByTestId('wrapper');
  fireEvent.click(wrapper);
  expect(onClick).toHaveBeenCalled();
});

test('onKeyDown', () => {
  const onKeyDown = jest.fn();
  const { getByTestId } = render(
    <Wrapper data-testid="wrapper" id="wrapper" onKeyDown={onKeyDown} />
  );
  const wrapper = getByTestId('wrapper');
  fireEvent.keyDown(wrapper, { key: 'Down Arrow', keyCode: 40 });
  expect(onKeyDown).toHaveBeenCalled();
});

test('overlayBackgroundColor', () => {
  const overlayBackgroundColor = 'blue';
  const { asFragment } = render(
    <Wrapper id="wrapper" overlayBackgroundColor={overlayBackgroundColor} />
  );
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: ${overlayBackgroundColor};"
  >
    <div
      aria-describedby=""
      aria-labelledby=""
      aria-modal="true"
      data-focuslast="false"
      data-test-id="focus-trap"
      id="wrapper"
      role="dialog"
    />
  </div>
</DocumentFragment>
`);
});

test('overlayProps', () => {
  const overlayProps = {
    id: 'wrapper-overlay',
    className: 'overlay-class',
    style: {
      color: 'red'
    }
  };
  const { asFragment } = render(<Wrapper id="wrapper" overlayProps={overlayProps} />);
  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="overlay-class"
    id="wrapper-overlay"
    style="color: red;"
  >
    <div
      aria-describedby=""
      aria-labelledby=""
      aria-modal="true"
      data-focuslast="false"
      data-test-id="focus-trap"
      id="wrapper"
      role="dialog"
    />
  </div>
</DocumentFragment>
`);
});
