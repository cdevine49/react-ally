import React from 'react';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Listbox, ListboxOption } from '../src/components/listbox';

afterEach(cleanup);

const NUMBERS = ['One', 'Two', 'Three', 'Four', 'Five'];

const ValidChildren = () =>
  NUMBERS.map(num => (
    <ListboxOption id={num} value={num}>
      {num}
    </ListboxOption>
  ));

test('missing required props', () => {
  console.error = jest.fn();
  <Listbox />;
  expect(console.error).toHaveBeenCalledTimes(5);

  const strings = ['aria-labelledby', 'children', 'id', 'onChange', 'value'].map(
    name => `Warning: Failed prop type: The prop \`${name}\` is marked as required in \`Listbox\`, but its value is \`undefined\`.
    in Listbox`
  );

  expect(console.error).toHaveBeenCalledWith(strings[0]);
  expect(console.error).toHaveBeenCalledWith(strings[1]);
  expect(console.error).toHaveBeenCalledWith(strings[2]);
  expect(console.error).toHaveBeenCalledWith(strings[3]);
  expect(console.error).toHaveBeenCalledWith(strings[4]);
});

test('wrong props type', () => {
  console.error = jest.fn();
  <Listbox
    aria-labelledby={1}
    id={3}
    onFocus={4}
    onKeyDown={5}
    onKeyPress={6}
    onChange={7}
    selectOnFocus={8}
    value={9}
  >
    {10}
  </Listbox>;
  expect(console.error).toHaveBeenCalledTimes(9);
  const strings = [
    { name: 'aria-labelledby', expected: 'string' },
    { name: 'id', expected: 'string' },
    { name: 'onFocus', expected: 'function' },
    { name: 'onKeyDown', expected: 'function' },
    { name: 'onKeyPress', expected: 'function' },
    { name: 'onChange', expected: 'function' },
    { name: 'selectOnFocus', expected: 'boolean' }
  ].map(
    ({ name, expected }) =>
      `Warning: Failed prop type: Invalid prop \`${name}\` of type \`number\` supplied to \`Listbox\`, expected \`${expected}\`.
    in Listbox`
  );

  expect(console.error).toHaveBeenCalledWith(strings[0]);
  expect(console.error).toHaveBeenCalledWith(strings[1]);
  expect(console.error).toHaveBeenCalledWith(strings[2]);
  expect(console.error).toHaveBeenCalledWith(strings[3]);
  expect(console.error).toHaveBeenCalledWith(strings[4]);
  expect(console.error).toHaveBeenCalledWith(strings[5]);
  expect(console.error).toHaveBeenCalledWith(strings[6]);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: Invalid prop \`children\` supplied to \`Listbox\`.
    in Listbox`);
  expect(console.error)
    .toHaveBeenCalledWith(`Warning: Failed prop type: Invalid prop \`value\` supplied to \`Listbox\`.
    in Listbox`);
});

const component = ({
  ariaLabelledby = 'labelId',
  children = [],
  id = 'listboxId',
  onChange = () => {},
  value = '',
  ...props
}) => (
  <Listbox aria-labelledby={ariaLabelledby} id={id} onChange={onChange} value={value} {...props}>
    {children}
  </Listbox>
);

test('aria-labelledby', () => {
  const { asFragment } = render(component({ 'aria-labelledby': 'hello-world' }));
  expect(asFragment()).toMatchSnapshot();
});

test('children', () => {
  console.error = jest.fn();
  const children = [
    <ListboxOption value={NUMBERS[0]}>{NUMBERS[0]}</ListboxOption>,
    'two',
    <ListboxOption value={NUMBERS[2]}>{NUMBERS[2]}</ListboxOption>,
    3,
    <ListboxOption value={NUMBERS[4]}>{NUMBERS[4]}</ListboxOption>,
    <div />
  ];
  const { asFragment } = render(component({ children }));
  expect(asFragment()).toMatchSnapshot();
});

test('id', () => {
  const { asFragment } = render(component({ id: 'hello-world' }));
  expect(asFragment()).toMatchSnapshot();
});

test('onFocus', () => {
  const onFocus = jest.fn();
  const listbox = component({ onFocus, children: ValidChildren() });
  const { getByRole } = render(listbox);
  const container = getByRole('listbox');
  container.focus();
  expect(onFocus).toHaveBeenCalled();
});

test('onKeyDown', () => {
  const onKeyDown = jest.fn();
  const listbox = component({ children: ValidChildren(), onKeyDown });
  const { getByRole } = render(listbox);
  const container = getByRole('listbox');

  fireEvent.keyDown(container, {
    key: 'Up Arrow',
    keyCode: 38
  });

  fireEvent.keyDown(container, {
    key: 'Down Arrow',
    keyCode: 40
  });

  fireEvent.keyDown(container, {
    key: 'Space',
    keyCode: 32
  });

  fireEvent.keyDown(container, {
    key: 'Enter',
    keyCode: 13
  });

  expect(onKeyDown).toHaveBeenCalledTimes(4);
});

test('onKeyPress', () => {
  const onKeyPress = jest.fn();
  const listbox = component({ onKeyPress });
  const { getByRole } = render(listbox);
  const container = getByRole('listbox');

  fireEvent.keyPress(container, {
    key: 'Up Arrow',
    keyCode: 38,
    charCode: 38
  });

  fireEvent.keyPress(container, {
    key: 'Down Arrow',
    keyCode: 40,
    charCode: 40
  });

  fireEvent.keyPress(container, {
    key: 'Space',
    keyCode: 32,
    charCode: 32
  });

  fireEvent.keyPress(container, {
    key: 'Enter',
    keyCode: 13,
    charCode: 13
  });

  expect(onKeyPress).toHaveBeenCalledTimes(4);
});

test('tabIndex', () => {
  const { asFragment } = render(component({ tabIndex: -1 }));
  expect(asFragment()).toMatchSnapshot();
});

test('value as string', () => {
  const { asFragment } = render(component({ children: ValidChildren(), value: NUMBERS[2] }));
  expect(asFragment()).toMatchSnapshot();
});

test('value as array', () => {
  const { asFragment } = render(
    component({ children: ValidChildren(), value: [NUMBERS[1], NUMBERS[4]] })
  );
  expect(asFragment()).toMatchSnapshot();
});

describe('onChange', () => {
  describe('singular', () => {
    describe('with selectOnFocus', () => {
      const events = [
        { key: 'Up Arrow', keyCode: 38, expectation: NUMBERS[4] },
        { key: 'Down Arrow', keyCode: 40, expectation: NUMBERS[1] },
        { key: 'End', keyCode: 35, expectation: NUMBERS[4] }
      ];

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown`, () => {
          const onChange = jest.fn();
          const props = {
            children: ValidChildren(),
            onChange
          };
          const listbox = component(props);
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();
          expect(onChange).toHaveBeenCalledWith(NUMBERS[0]);
          rerender(component({ ...props, value: NUMBERS[0] }));
          onChange.mockClear();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode
          });
          expect(onChange).toHaveBeenCalledWith(event.expectation);
        });
      });

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown + shiftkey`, () => {
          const onChange = jest.fn();
          const props = {
            children: ValidChildren(),
            onChange
          };
          const listbox = component(props);
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();
          expect(onChange).toHaveBeenCalledWith(NUMBERS[0]);
          rerender(component({ ...props, value: NUMBERS[0] }));
          onChange.mockClear();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: true
          });
          expect(onChange).toHaveBeenCalledWith(event.expectation);
        });
      });

      for (let i = 0; i < 2; i++) {
        test(`home keydown${i > 0 ? ' + shiftkey' : ''}`, () => {
          const onChange = jest.fn();
          const listbox = component({ children: ValidChildren(), onChange });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });

          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
          onChange.mockClear();

          fireEvent.keyDown(container, {
            key: 'Home',
            keyCode: 36,
            shiftKey: i > 0
          });
          rerender(listbox);
          expect(onChange).toHaveBeenCalledWith(NUMBERS[0]);
          expect(onChange).toHaveBeenCalledTimes(1);
        });
      }
    });

    describe('without selectOnFocus', () => {
      test('spacebar', () => {
        const onChange = jest.fn();
        const props = {
          children: ValidChildren().slice(0, 2),
          onChange,
          selectOnFocus: false
        };
        const listbox = component(props);
        const { getByRole, rerender } = render(listbox);
        const container = getByRole('listbox');

        container.focus();
        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith(NUMBERS[0]);

        rerender(component({ value: NUMBERS[0], ...props }));
        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith('');
      });

      const events = [
        { key: 'Up Arrow', keyCode: 38, expectation: NUMBERS[4] },
        { key: 'Down Arrow', keyCode: 40, expectation: NUMBERS[1] },
        { key: 'Home', keyCode: 36, expectation: null },
        { key: 'End', keyCode: 35, expectation: null }
      ];

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown`, () => {
          const onChange = jest.fn();
          const listbox = component({
            children: ValidChildren(),
            onChange,
            selectOnFocus: false
          });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: false
          });
          rerender(listbox);
          expect(onChange).not.toHaveBeenCalled();
        });
      });

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown + shiftkey`, () => {
          const onChange = jest.fn();
          const listbox = component({
            children: ValidChildren(),
            onChange,
            selectOnFocus: false
          });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: true
          });
          rerender(listbox);

          if (event.expectation) {
            expect(onChange).toHaveBeenCalledWith(event.expectation);
          } else {
            expect(onChange).not.toHaveBeenCalled();
          }

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: false
          });
          rerender(listbox);
          expect(onChange).toHaveBeenCalledTimes(+!!event.expectation);
        });
      });
    });
  });

  describe('multiple', () => {
    describe('with selectOnFocus', () => {
      test('focus', () => {
        const onChange = jest.fn();
        const listbox = component({ children: ValidChildren(), onChange: onChange, value: [] });
        const { getByRole, rerender } = render(listbox);

        const container = getByRole('listbox');
        container.focus();

        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });
        rerender(listbox);
        expect(onChange).not.toHaveBeenCalled();
      });

      test('spacebar', () => {
        const onChange = jest.fn();
        const props = { children: ValidChildren(), onChange, value: [] };
        const listbox = component(props);
        const { getByRole, rerender } = render(listbox);
        const container = getByRole('listbox');
        container.focus();
        rerender(listbox);
        onChange.mockClear();

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0]]);
        expect(onChange).toHaveBeenCalledTimes(1);

        rerender(component({ ...props, value: [NUMBERS[0]] }));
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0], NUMBERS[1]]);
        expect(onChange).toHaveBeenCalledTimes(2);

        rerender(component({ ...props, value: [NUMBERS[0], NUMBERS[1]] }));
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0], NUMBERS[1], NUMBERS[2]]);
        expect(onChange).toHaveBeenCalledTimes(3);

        rerender(component({ ...props, value: [NUMBERS[0], NUMBERS[1], NUMBERS[2]] }));
        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38
        });

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0], NUMBERS[2]]);
        expect(onChange).toHaveBeenCalledTimes(4);
      });

      const events = [
        { key: 'Up Arrow', keyCode: 38, expectation: [NUMBERS[4]] },
        { key: 'Down Arrow', keyCode: 40, expectation: [NUMBERS[1]] },
        { key: 'End', keyCode: 35, expectation: null }
      ];

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown`, () => {
          const onChange = jest.fn();
          const listbox = component({
            children: ValidChildren(),
            onChange,
            value: []
          });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode
          });
          rerender(listbox);
          expect(onChange).not.toHaveBeenCalled();
        });
      });

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown + shiftkey`, () => {
          const onChange = jest.fn();
          const listbox = component({
            children: ValidChildren(),
            onChange,
            value: []
          });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: true
          });
          rerender(listbox);
          if (event.expectation) {
            expect(onChange).toHaveBeenCalledWith(event.expectation);
          } else {
            expect(onChange).not.toHaveBeenCalled();
          }
        });
      });

      for (let i = 0; i < 2; i++) {
        test(`home keydown${i > 0 ? ' + shiftkey' : ''}`, () => {
          const onChange = jest.fn();
          const listbox = component({ children: ValidChildren(), onChange, value: [] });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });

          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });

          fireEvent.keyDown(container, {
            key: 'Home',
            keyCode: 36,
            shiftKey: i > 0
          });
          rerender(listbox);
          expect(onChange).not.toHaveBeenCalled();
        });
      }
    });

    describe('without selectOnFocus', () => {
      test('spacebar', () => {
        const onChange = jest.fn();
        const props = { children: ValidChildren(), onChange, selectOnFocus: false, value: [] };
        const listbox = component(props);
        const { getByRole, rerender } = render(listbox);
        const container = getByRole('listbox');
        container.focus();
        rerender(listbox);
        onChange.mockClear();

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0]]);
        expect(onChange).toHaveBeenCalledTimes(1);

        rerender(component({ ...props, value: [NUMBERS[0]] }));
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0], NUMBERS[1]]);
        expect(onChange).toHaveBeenCalledTimes(2);

        rerender(component({ ...props, value: [NUMBERS[0], NUMBERS[1]] }));
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0], NUMBERS[1], NUMBERS[2]]);
        expect(onChange).toHaveBeenCalledTimes(3);

        rerender(component({ ...props, value: [NUMBERS[0], NUMBERS[1], NUMBERS[2]] }));
        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38
        });

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(onChange).toHaveBeenCalledWith([NUMBERS[0], NUMBERS[2]]);
        expect(onChange).toHaveBeenCalledTimes(4);
      });

      const events = [
        { key: 'Up Arrow', keyCode: 38, expectation: [NUMBERS[4]] },
        { key: 'Down Arrow', keyCode: 40, expectation: [NUMBERS[1]] },
        { key: 'End', keyCode: 35, expectation: null }
      ];

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown`, () => {
          const onChange = jest.fn();
          const listbox = component({
            children: ValidChildren(),
            onChange,
            selectOnFocus: false,
            value: []
          });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode
          });
          rerender(listbox);
          expect(onChange).not.toHaveBeenCalled();
        });
      });

      events.forEach(event => {
        test(`${event.key.toLowerCase()} keydown + shiftkey`, () => {
          const onChange = jest.fn();
          const listbox = component({
            children: ValidChildren(),
            onChange,
            selectOnFocus: false,
            value: []
          });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: true
          });
          rerender(listbox);

          if (event.expectation) {
            expect(onChange).toHaveBeenCalledWith(event.expectation);
          } else {
            expect(onChange).not.toHaveBeenCalled();
          }

          fireEvent.keyDown(container, {
            key: event.key,
            keyCode: event.keyCode,
            shiftKey: false
          });
          rerender(listbox);
          expect(onChange).toHaveBeenCalledTimes(+!!event.expectation);
        });
      });

      for (let i = 0; i < 2; i++) {
        test(`home keydown${i > 0 ? ' + shiftkey' : ''}`, () => {
          const onChange = jest.fn();
          const listbox = component({ children: ValidChildren(), onChange, value: [] });
          const { getByRole, rerender } = render(listbox);
          const container = getByRole('listbox');
          container.focus();

          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });

          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });

          fireEvent.keyDown(container, {
            key: 'Home',
            keyCode: 36,
            shiftKey: i > 0
          });
          rerender(listbox);
          expect(onChange).not.toHaveBeenCalled();
        });
      }
    });
  });
});

describe('Single', () => {
  describe('selectOnFocus=true', () => {
    let container, props, rerender;
    beforeEach(() => {
      props = {
        children: ValidChildren(),
        onChange: jest.fn(),
        selectOnFocus: true,
        sort: jest.fn()
      };
      const renderedComponent = render(component(props));
      rerender = renderedComponent.rerender;
      container = renderedComponent.getByRole('listbox');
      container.focus();
    });

    test('initial focus', () => {
      expect(props.onChange).toHaveBeenCalledWith(NUMBERS[0]);
    });

    describe('keydown', () => {
      test('space', () => {
        props.onChange.mockClear();
        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('up-arrow', () => {
        rerender(component({ ...props, value: NUMBERS[0] }));
        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38
        });
        const lastValue = NUMBERS[NUMBERS.length - 1];
        expect(props.onChange).toHaveBeenLastCalledWith(lastValue);
        rerender(component({ ...props, value: lastValue }));

        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38
        });
        const penultimateValue = NUMBERS[NUMBERS.length - 2];
        expect(props.onChange).toHaveBeenLastCalledWith(penultimateValue);
        rerender(component({ ...props, value: penultimateValue }));
      });

      test('down-arrow', () => {
        const firstValue = NUMBERS[0];
        rerender(component({ ...props, value: firstValue }));

        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });

        const secondValue = NUMBERS[1];
        expect(props.onChange).toHaveBeenLastCalledWith(secondValue);
        rerender(component({ ...props, value: secondValue }));
        props.onChange.mockClear();

        rerender(component({ ...props, value: NUMBERS[NUMBERS.length - 1] }));
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });
        expect(props.onChange).toHaveBeenLastCalledWith(firstValue);
      });

      test('home', () => {
        rerender(component({ ...props, value: NUMBERS[3] }));
        props.onChange.mockClear();

        fireEvent.keyDown(container, {
          key: 'Home',
          keyCode: 36
        });

        expect(props.onChange).toHaveBeenCalledWith(NUMBERS[0]);
      });

      test('end', () => {
        rerender(component({ ...props, value: NUMBERS[1] }));
        fireEvent.keyDown(container, {
          key: 'End',
          keyCode: 35
        });
        expect(props.onChange).toHaveBeenLastCalledWith(NUMBERS[NUMBERS.length - 1]);
      });

      test('control+shift+home', () => {
        rerender(component({ ...props, value: NUMBERS[3] }));
        props.onChange.mockClear();
        fireEvent.keyDown(container, {
          key: 'Home',
          keyCode: 36,
          shiftKey: true,
          ctrlKey: true
        });
        expect(props.onChange).toBeCalledWith(NUMBERS[0]);
      });

      test('control+shift+end', () => {
        fireEvent.keyDown(container, {
          key: 'End',
          keyCode: 35,
          shiftKey: true,
          ctrlKey: true
        });
        expect(props.onChange).toHaveBeenLastCalledWith(NUMBERS[NUMBERS.length - 1]);
      });

      test('shift+space', () => {
        props.onChange.mockClear();
        const value = NUMBERS[1];
        rerender(component({ ...props, value }));

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32,
          shiftKey: true
        });

        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('alt+up-arrow', () => {
        props.onChange.mockClear();
        rerender(component({ ...props, value: NUMBERS[1] }));

        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38,
          altKey: true
        });

        expect(props.onChange).not.toHaveBeenCalled();
        expect(props.sort).toBeCalledWith(1, 0);
      });

      test('alt+down-arrow', () => {
        props.onChange.mockClear();
        rerender(component({ ...props, value: NUMBERS[1] }));

        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40,
          altKey: true
        });

        expect(props.onChange).not.toHaveBeenCalled();
        expect(props.sort).toBeCalledWith(1, 2);
      });

      test('shift+up-arrow', () => {
        props.onChange.mockClear();
        rerender(component({ ...props, value: NUMBERS[1] }));

        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38,
          shiftKey: true
        });

        expect(props.onChange).toHaveBeenCalledWith(NUMBERS[0]);
      });

      test('shit+down-arrow', () => {
        props.onChange.mockClear();
        rerender(component({ ...props, value: NUMBERS[1] }));

        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40,
          shiftKey: true
        });

        expect(props.onChange).toHaveBeenCalledWith(NUMBERS[2]);
      });
    });

    test('type ahead', () => {
      fireEvent.keyPress(container, {
        key: 't',
        code: 84,
        charCode: 84
      });
      rerender(component(props));
      const two = NUMBERS[1];
      expect(props.onChange).toHaveBeenLastCalledWith(two);
      const oneLetter = component({ ...props, value: two });
      rerender(oneLetter);

      fireEvent.keyPress(container, {
        key: 'h',
        code: 72,
        charCode: 72
      });
      rerender(oneLetter);
      const three = NUMBERS[2];
      expect(props.onChange).toHaveBeenLastCalledWith(three);
      const twoLetters = component({ ...props, value: three });
      rerender(twoLetters);

      props.onChange.mockClear();
      fireEvent.keyPress(container, {
        key: 'r',
        code: 82,
        charCode: 82
      });
      rerender(twoLetters);
      expect(props.onChange).not.toHaveBeenCalled();
    });
  });

  describe('selectOnFocus=false', () => {
    let container, props, renderedComponent;
    beforeEach(() => {
      props = {
        children: ValidChildren(),
        onChange: jest.fn(),
        selectOnFocus: false,
        sort: jest.fn()
      };
      renderedComponent = render(component(props));
      container = renderedComponent.getByRole('listbox');
      container.focus();
    });

    test('initial focus', () => {
      expect(props.onChange).not.toHaveBeenCalled();
      renderedComponent.rerender(component(props));
      expect(renderedComponent.asFragment()).toMatchSnapshot();
    });

    describe('keydown', () => {
      test('space', () => {
        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(props.onChange).toHaveBeenLastCalledWith(NUMBERS[0]);

        renderedComponent.rerender(component({ ...props, value: NUMBERS[0] }));
        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32
        });
        expect(props.onChange).toHaveBeenLastCalledWith('');
      });

      test('up-arrow', () => {
        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38
        });
        expect(renderedComponent.asFragment()).toMatchSnapshot();

        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38
        });
        expect(renderedComponent.asFragment()).toMatchSnapshot();
        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('down-arrow', () => {
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40
        });
        expect(renderedComponent.asFragment()).toMatchSnapshot();

        for (let i = 1; i < NUMBERS.length; i++) {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
        }
        expect(renderedComponent.asFragment()).toMatchSnapshot();
        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('home', () => {
        for (let i = 0; i < 3; i++) {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
        }
        fireEvent.keyDown(container, {
          key: 'Home',
          keyCode: 36
        });
        expect(renderedComponent.asFragment()).toMatchSnapshot();
        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('end', () => {
        for (let i = 0; i < 3; i++) {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
        }
        fireEvent.keyDown(container, {
          key: 'End',
          keyCode: 35
        });
        expect(renderedComponent.asFragment()).toMatchSnapshot();
        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('control+shift+home', () => {
        for (let i = 0; i < 3; i++) {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
        }
        renderedComponent.rerender(component({ ...props, value: NUMBERS[3] }));
        fireEvent.keyDown(container, {
          key: 'Home',
          keyCode: 36,
          shiftKey: true,
          ctrlKey: true
        });
        expect(renderedComponent.asFragment()).toMatchSnapshot();
        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('control+shift+end', () => {
        for (let i = 0; i < 2; i++) {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
        }
        renderedComponent.rerender(component({ ...props, value: NUMBERS[2] }));
        fireEvent.keyDown(container, {
          key: 'End',
          keyCode: 35,
          shiftKey: true,
          ctrlKey: true
        });
        expect(renderedComponent.asFragment()).toMatchSnapshot();
        expect(props.onChange).not.toHaveBeenCalled();
      });

      test('shift+space', () => {
        let i = 0;
        for (i; i < 1; i++) {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
        }

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32,
          shiftKey: true
        });
        expect(props.onChange).toHaveBeenLastCalledWith(NUMBERS[i]);
        renderedComponent.rerender(component({ ...props, value: NUMBERS[i] }));

        for (i; i < 3; i++) {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
        }

        fireEvent.keyDown(container, {
          key: 'Space',
          keyCode: 32,
          shiftKey: true
        });

        expect(props.onChange).toHaveBeenLastCalledWith(NUMBERS[i]);
      });

      test('alt+up-arrow', () => {
        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38,
          altKey: true
        });

        expect(props.onChange).not.toHaveBeenCalled();
        expect(props.sort).toBeCalledWith(0, NUMBERS.length - 1);
      });

      test('alt+down-arrow', () => {
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40,
          altKey: true
        });

        expect(props.onChange).not.toHaveBeenCalled();
        expect(props.sort).toBeCalledWith(0, 1);
      });

      test('shift+up-arrow', () => {
        fireEvent.keyDown(container, {
          key: 'Up Arrow',
          keyCode: 38,
          shiftKey: true
        });
        renderedComponent.rerender(component(props));
        expect(props.onChange).toHaveBeenLastCalledWith(NUMBERS[NUMBERS.length - 1]);
      });

      test('shift+down-arrow', () => {
        fireEvent.keyDown(container, {
          key: 'Down Arrow',
          keyCode: 40,
          shiftKey: true
        });
        renderedComponent.rerender(component(props));
        expect(props.onChange).toHaveBeenLastCalledWith(NUMBERS[1]);
      });
    });

    test('type ahead', () => {
      fireEvent.keyPress(container, {
        key: 't',
        code: 84,
        charCode: 84
      });
      renderedComponent.rerender(component(props));
      expect(renderedComponent.asFragment()).toMatchSnapshot();

      fireEvent.keyPress(container, {
        key: 'h',
        code: 72,
        charCode: 72
      });
      renderedComponent.rerender(component(props));
      expect(renderedComponent.asFragment()).toMatchSnapshot();

      fireEvent.keyPress(container, {
        key: 'r',
        code: 82,
        charCode: 82
      });
      renderedComponent.rerender(component(props));
      expect(renderedComponent.asFragment()).toMatchSnapshot();
      expect(props.onChange).not.toHaveBeenCalled();
    });
  });
});

describe('Multi', () => {
  // All behavior should be the same regardless of selectOnFocus boolean value
  [true, false].forEach(selectOnFocus => {
    describe(`selectOnFocus=${selectOnFocus}`, () => {
      let container, props, renderedComponent;
      beforeEach(() => {
        props = {
          children: ValidChildren(),
          onChange: jest.fn(),
          selectOnFocus,
          sort: jest.fn(),
          value: []
        };
        renderedComponent = render(component(props));
        container = renderedComponent.getByRole('listbox');
        container.focus();
      });

      test('initial focus', () => {
        expect(props.onChange).not.toHaveBeenCalledWith();
        renderedComponent.rerender(component(props));
        expect(renderedComponent.asFragment()).toMatchSnapshot();
      });

      describe('keydown', () => {
        test('space', () => {
          fireEvent.keyDown(container, {
            key: 'Space',
            keyCode: 32
          });
          expect(props.onChange).toHaveBeenLastCalledWith([NUMBERS[0]]);

          renderedComponent.rerender(component({ ...props, value: [NUMBERS[0]] }));
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
          fireEvent.keyDown(container, {
            key: 'Space',
            keyCode: 32
          });
          expect(props.onChange).toHaveBeenLastCalledWith([NUMBERS[0], NUMBERS[1]]);

          renderedComponent.rerender(component({ ...props, value: [NUMBERS[0], NUMBERS[1]] }));
          fireEvent.keyDown(container, {
            key: 'Up Arrow',
            keyCode: 38
          });
          fireEvent.keyDown(container, {
            key: 'Space',
            keyCode: 32
          });
          expect(props.onChange).toHaveBeenLastCalledWith([NUMBERS[1]]);
        });

        test('up-arrow', () => {
          fireEvent.keyDown(container, {
            key: 'Up Arrow',
            keyCode: 38
          });
          expect(renderedComponent.asFragment()).toMatchSnapshot();

          fireEvent.keyDown(container, {
            key: 'Up Arrow',
            keyCode: 38
          });
          expect(renderedComponent.asFragment()).toMatchSnapshot();
          expect(props.onChange).not.toHaveBeenCalled();
        });

        test('down-arrow', () => {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
          expect(renderedComponent.asFragment()).toMatchSnapshot();

          for (let i = 1; i < NUMBERS.length; i++) {
            fireEvent.keyDown(container, {
              key: 'Down Arrow',
              keyCode: 40
            });
          }
          expect(renderedComponent.asFragment()).toMatchSnapshot();
          expect(props.onChange).not.toHaveBeenCalled();
        });

        test('home', () => {
          for (let i = 0; i < 3; i++) {
            fireEvent.keyDown(container, {
              key: 'Down Arrow',
              keyCode: 40
            });
          }
          fireEvent.keyDown(container, {
            key: 'Home',
            keyCode: 36
          });
          expect(renderedComponent.asFragment()).toMatchSnapshot();
          expect(props.onChange).not.toHaveBeenCalled();
        });

        test('end', () => {
          for (let i = 0; i < 3; i++) {
            fireEvent.keyDown(container, {
              key: 'Down Arrow',
              keyCode: 40
            });
          }
          fireEvent.keyDown(container, {
            key: 'End',
            keyCode: 35
          });
          expect(renderedComponent.asFragment()).toMatchSnapshot();
          expect(props.onChange).not.toHaveBeenCalled();
        });

        test('control+shift+home', () => {
          for (let i = 0; i < 2; i++) {
            fireEvent.keyDown(container, {
              key: 'Down Arrow',
              keyCode: 40
            });
          }
          renderedComponent.rerender(component({ ...props, value: [NUMBERS[1], NUMBERS[4]] }));
          fireEvent.keyDown(container, {
            key: 'Home',
            keyCode: 36,
            shiftKey: true,
            ctrlKey: true
          });
          expect(props.onChange).toHaveBeenLastCalledWith([
            NUMBERS[1],
            NUMBERS[4],
            NUMBERS[2],
            NUMBERS[0]
          ]);
        });

        test('control+shift+end', () => {
          for (let i = 0; i < 2; i++) {
            fireEvent.keyDown(container, {
              key: 'Down Arrow',
              keyCode: 40
            });
          }
          renderedComponent.rerender(component({ ...props, value: [NUMBERS[0], NUMBERS[3]] }));
          fireEvent.keyDown(container, {
            key: 'End',
            keyCode: 35,
            shiftKey: true,
            ctrlKey: true
          });
          expect(props.onChange).toHaveBeenLastCalledWith([
            NUMBERS[0],
            NUMBERS[3],
            NUMBERS[2],
            NUMBERS[4]
          ]);
        });

        test('shift+space', () => {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40
          });
          renderedComponent.rerender(component({ ...props, value: [NUMBERS[1]] }));

          for (let i = 1; i < 3; i++) {
            fireEvent.keyDown(container, {
              key: 'Down Arrow',
              keyCode: 40
            });
          }

          fireEvent.keyDown(container, {
            key: 'Space',
            keyCode: 32,
            shiftKey: true
          });

          expect(props.onChange).toHaveBeenLastCalledWith([NUMBERS[1], NUMBERS[2], NUMBERS[3]]);
        });

        test('alt+up-arrow', () => {
          fireEvent.keyDown(container, {
            key: 'Up Arrow',
            keyCode: 38,
            altKey: true
          });

          expect(props.onChange).not.toHaveBeenCalled();
          expect(props.sort).toBeCalledWith(0, NUMBERS.length - 1);
        });

        test('alt+down-arrow', () => {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40,
            altKey: true
          });

          expect(props.onChange).not.toHaveBeenCalled();
          expect(props.sort).toBeCalledWith(0, 1);
        });

        test('shift+up-arrow', () => {
          fireEvent.keyDown(container, {
            key: 'Up Arrow',
            keyCode: 38,
            shiftKey: true
          });
          renderedComponent.rerender(component(props));
          expect(props.onChange).toHaveBeenLastCalledWith([NUMBERS[NUMBERS.length - 1]]);
        });

        test('shift+down-arrow', () => {
          fireEvent.keyDown(container, {
            key: 'Down Arrow',
            keyCode: 40,
            shiftKey: true
          });
          renderedComponent.rerender(component(props));
          expect(props.onChange).toHaveBeenLastCalledWith([NUMBERS[1]]);
        });
      });
    });
  });
});
