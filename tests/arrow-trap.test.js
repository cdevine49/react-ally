import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ArrowTrap, FocusContext } from '../src/arrow-trap';

const Button = (props) => {
  const ref = React.useRef(null);
  const { onKeyDown, register } = React.useContext(FocusContext);
  React.useEffect(() => {
    register(ref.current);
  }, [register]);
  return <button ref={ref} {...props} onKeyDown={onKeyDown} />;
};

test('If focus is on a registered element, {arrowleft} moves focus to the previous registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, second, last] = screen.getAllByRole('button');
  last.focus();

  user.type(last, '{arrowleft}', { skipClick: true });
  expect(second).toHaveFocus();
  user.type(second, '{arrowleft}', { skipClick: true });
  expect(first).toHaveFocus();
});

test('If focus is on the first registered element, {arrowleft} moves focus to the last registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, _, last] = screen.getAllByRole('button');
  first.focus();

  user.type(first, '{arrowleft}', { skipClick: true });
  expect(last).toHaveFocus();
});

test('If horizontal arrows are disabled, {arrowleft} does not move focus', () => {
  render(
    <ArrowTrap allowHorizontal={false}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const second = screen.getByRole('button', { name: 'Second' });
  second.focus();

  user.type(second, '{arrowleft}', { skipClick: true });
  expect(second).toHaveFocus();
});

test('If focus is on a registered element, {arrowright} moves focus to the next registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, second, last] = screen.getAllByRole('button');
  first.focus();

  user.type(first, '{arrowright}', { skipClick: true });
  expect(second).toHaveFocus();
  user.type(second, '{arrowright}', { skipClick: true });
  expect(last).toHaveFocus();
});

test('If focus is on the last registered element, {arrowright} moves focus to the first registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, _, last] = screen.getAllByRole('button');
  last.focus();

  user.type(last, '{arrowright}', { skipClick: true });
  expect(first).toHaveFocus();
});

test('If horizontal arrows are disabled, {arrowright} does not move focus', () => {
  render(
    <ArrowTrap allowHorizontal={false}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const second = screen.getByRole('button', { name: 'Second' });
  second.focus();

  user.type(second, '{arrowright}', { skipClick: true });
  expect(second).toHaveFocus();
});

test('If focus is on a registered element, {arrowup} moves focus to the previous registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, second, last] = screen.getAllByRole('button');
  last.focus();

  user.type(last, '{arrowup}', { skipClick: true });
  expect(second).toHaveFocus();
  user.type(second, '{arrowup}', { skipClick: true });
  expect(first).toHaveFocus();
});

test('If focus is on the first registered element, {arrowup} moves focus to the last registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, _, last] = screen.getAllByRole('button');
  first.focus();

  user.type(first, '{arrowup}', { skipClick: true });
  expect(last).toHaveFocus();
});

test('If vertical arrows are disabled, {arrowup} does not move focus', () => {
  render(
    <ArrowTrap allowVertical={false}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const second = screen.getByRole('button', { name: 'Second' });
  second.focus();

  user.type(second, '{arrowup}', { skipClick: true });
  expect(second).toHaveFocus();
});

test('If focus is on a registered element, {arrowdown} moves focus to the next registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, second, last] = screen.getAllByRole('button');
  first.focus();

  user.type(first, '{arrowdown}', { skipClick: true });
  expect(second).toHaveFocus();
  user.type(second, '{arrowdown}', { skipClick: true });
  expect(last).toHaveFocus();
});

test('If focus is on the last registered element, {arrowdown} moves focus to the first registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const [first, _, last] = screen.getAllByRole('button');
  last.focus();

  user.type(last, '{arrowdown}', { skipClick: true });
  expect(first).toHaveFocus();
});

test('If vertical arrows are disabled, {arrowdown} does not move focus', () => {
  render(
    <ArrowTrap allowVertical={false}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const second = screen.getByRole('button', { name: 'Second' });
  second.focus();

  user.type(second, '{arrowdown}', { skipClick: true });
  expect(second).toHaveFocus();
});

test('If focus is on a registered element, {home} moves focus to the first registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const buttons = screen.getAllByRole('button');
  const first = buttons[0];

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.focus();
    user.type(button, '{home}', { skipClick: true });
    expect(first).toHaveFocus();
  }
});

test('If jump buttons are disabled, {home} does not move focus', () => {
  render(
    <ArrowTrap allowJump={false}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const second = screen.getByRole('button', { name: 'Second' });
  second.focus();

  user.type(second, '{home}', { skipClick: true });
  expect(second).toHaveFocus();
});

test('If focus is on a registered element, {end} moves focus to the last registered element', () => {
  render(
    <ArrowTrap>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const buttons = screen.getAllByRole('button');
  const last = buttons[buttons.length - 1];

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.focus();
    user.type(button, '{end}', { skipClick: true });
    expect(last).toHaveFocus();
  }
});

test('If jump buttons are disabled, {end} does not move focus', () => {
  render(
    <ArrowTrap allowJump={false}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </ArrowTrap>,
  );
  const second = screen.getByRole('button', { name: 'Second' });
  second.focus();

  user.type(second, '{end}', { skipClick: true });
  expect(second).toHaveFocus();
});
