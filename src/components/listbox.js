import React, { useEffect, useRef, useState } from 'react';
import { array, arrayOf, bool, element, func, number, oneOfType, string } from 'prop-types';

export const Listbox = React.forwardRef(
  (
    {
      children = [],
      onFocus = () => {},
      onKeyDown = () => {},
      onKeyPress = () => {},
      onChange = () => {},
      sort = () => {},
      selectOnFocus = true,
      value,
      ...props
    },
    ref
  ) => {
    const prevActiveValueRef = useRef();
    const [activeValue, setActiveValue] = useState('');
    const [ctrlShift, setCtrlShift] = useState(false);
    const [selecting, setSelecting] = useState(false);
    const [typeAhead, setTypeAhead] = useState('');

    const multiselectable = Array.isArray(value);
    const autoSelect = !multiselectable && selectOnFocus;
    const _optionId = index => (index > -1 ? `${props.id}-result-item-${index}` : null);

    const _findIndex = value =>
      React.Children.toArray(children).findIndex(
        child => child.props && child.props.value === value
      );

    const selectBetween = (first, last) => {
      const arrayChildren = React.Children.toArray(children);
      const newValues = [];

      if (first < last) {
        for (let i = first; i <= last; i++) {
          newValues.push(arrayChildren[i].props.value);
        }
      } else {
        for (let i = first; i >= last; i--) {
          newValues.push(arrayChildren[i].props.value);
        }
      }

      onChange(value.concat(newValues).filter((v, index, self) => self.indexOf(v) === index));
    };

    const handleChange = selectedValue => {
      if (multiselectable) {
        const foundIndex = value.findIndex(v => v === selectedValue);
        if (foundIndex > -1) {
          onChange(value.slice(0, foundIndex).concat(value.slice(foundIndex + 1)));
        } else {
          onChange(value.concat([selectedValue]));
        }
      } else {
        if (selectedValue !== value) {
          onChange(selectedValue);
        } else if (!props['aria-required']) {
          onChange('');
        }
      }
    };

    useEffect(() => {
      if (ctrlShift && multiselectable) {
        selectBetween(_findIndex(prevActiveValueRef.current), _findIndex(activeValue));
      } else if (selecting) {
        setSelecting(false);
        handleChange(activeValue);
      }
    }, [activeValue]);

    useEffect(() => {
      prevActiveValueRef.current = activeValue;
    }, [activeValue]);

    useEffect(() => {
      if (typeAhead) {
        const matchesTypeAhead = child =>
          child.props.children.slice(0, typeAhead.length).toLowerCase() === typeAhead;

        const activeIndex = _findIndex(activeValue);
        const child = children
          .slice(activeIndex)
          .concat(children.slice(0, activeIndex))
          .find(child => matchesTypeAhead(child));

        if (child) {
          if (value !== child.props.value) {
            if (autoSelect) {
              handleChange(child.props.value);
            } else {
              setActiveValue(child.props.value);
            }
          }
        }

        const resetTypeAhead = setTimeout(() => {
          setTypeAhead('');
        }, 500);

        return () => {
          clearTimeout(resetTypeAhead);
        };
      }
    }, [typeAhead]);

    const handleListFocus = e => {
      if (autoSelect && !value.length) {
        handleChange(children[0].props.value);
      } else if (!autoSelect) {
        setActiveValue(activeValue =>
          _findIndex(activeValue) < 0 ? children[0].props.value : activeValue
        );
      }
      onFocus(e);
    };

    const handleKeyDown = e => {
      const count = children.length;
      setCtrlShift(false);
      switch (e.keyCode) {
        // space
        case 32:
          e.preventDefault();
          if (multiselectable && e.shiftKey && value.length) {
            const lastValue = value[value.length - 1];
            const foundIndex = children.findIndex(child => child.props.value === lastValue);
            selectBetween(foundIndex, _findIndex(activeValue));
          } else if (multiselectable || !selectOnFocus) {
            handleChange(activeValue);
          }
          break;
        // end
        case 35:
          e.preventDefault();
          const endValue = children[count - 1].props.value;
          if (e.ctrlKey && e.shiftKey && multiselectable) {
            selectBetween(_findIndex(prevActiveValueRef.current), _findIndex(endValue));
            setActiveValue(endValue);
          } else if (autoSelect) {
            handleChange(endValue);
          } else {
            setActiveValue(endValue);
          }
          break;
        // home
        case 36:
          e.preventDefault();
          const firstValue = children[0].props.value;
          if (e.ctrlKey && e.shiftKey && multiselectable) {
            selectBetween(_findIndex(prevActiveValueRef.current), _findIndex(firstValue));
            setActiveValue(firstValue);
          } else if (autoSelect) {
            handleChange(firstValue);
          } else {
            setActiveValue(firstValue);
          }
          setActiveValue(children[0].props.value);
          break;
        // up arrow
        case 38:
          e.preventDefault();
          if (e.altKey) {
            const activeIndex = autoSelect ? _findIndex(value) : _findIndex(activeValue);
            const nextIndex = activeIndex === 0 ? count - 1 : activeIndex - 1;
            sort(activeIndex, nextIndex);
          } else if (autoSelect) {
            const activeIndex = _findIndex(value);
            const prevIndex = ((activeIndex < 0 ? 0 : activeIndex) + count - 1) % count;
            handleChange(children[prevIndex].props.value);
          } else {
            setActiveValue(activeValue => {
              const activeIndex = _findIndex(activeValue);
              const prevIndex = ((activeIndex < 0 ? 0 : activeIndex) + count - 1) % count;
              return children[prevIndex].props.value;
            });
            setSelecting(e.shiftKey);
          }
          break;
        // down arrow
        case 40:
          e.preventDefault();
          if (e.altKey) {
            const activeIndex = autoSelect ? _findIndex(value) : _findIndex(activeValue);
            const nextIndex = activeIndex === count - 1 ? 0 : activeIndex + 1;
            sort(activeIndex, nextIndex);
          } else if (autoSelect) {
            handleChange(children[(_findIndex(value) + 1) % count].props.value);
          } else {
            setActiveValue(
              activeValue => children[(_findIndex(activeValue) + 1) % count].props.value
            );
            setSelecting(e.shiftKey);
          }
          break;
        // a
        case 65:
          if (multiselectable && e.shiftKey) {
            if (value.length === children.length) {
              onChange([]);
            } else {
              selectBetween(0, count - 1);
            }
          }
      }
      onKeyDown(e);
    };

    const handleKeyPress = e => {
      setTypeAhead(typeAhead + e.key);
      onKeyPress(e);
    };

    const focusValue = autoSelect ? value : activeValue;

    return (
      <ul
        tabIndex={0}
        {...props}
        aria-activedescendant={_optionId(_findIndex(focusValue))}
        aria-multiselectable={multiselectable}
        onFocus={handleListFocus}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        ref={ref}
        role="listbox"
      >
        {React.Children.map(children, (child, index) => {
          const displayName = child.type && child.type.displayName;
          if (['ListboxOption', 'Styled(ListboxOption)'].find(el => el === displayName)) {
            return React.cloneElement(child, {
              focusValue,
              id: _optionId(index),
              onClick: itemValue => {
                if (itemValue === value) {
                  if (!autoSelect) {
                    handleChange(value);
                  }
                } else {
                  setActiveValue(itemValue);
                  setSelecting(itemValue);
                }
              },
              selected: value
            });
          }
        })}
      </ul>
    );
  }
);

Listbox.propTypes = {
  'aria-labelledby': string.isRequired,
  children: oneOfType([arrayOf(element), element]).isRequired,
  id: string.isRequired,
  onFocus: func,
  onKeyDown: func,
  onKeyPress: func,
  onChange: func.isRequired,
  sort: func,
  selectOnFocus: bool,
  value: oneOfType([array, string]).isRequired
};

export const ListboxOption = ({
  className: passedClassName = '',
  focusValue,
  onClick,
  selected,
  value,
  ...props
}) => {
  const itemRef = useRef(null);
  const ariaSelected = Array.isArray(selected)
    ? !!selected.find(s => s === value)
    : selected === value;

  const ensureVisible = () => {
    const listbox = itemRef.current.parentElement;
    if (listbox.scrollHeight || listbox.clientHeight) {
      const scrollBottom = listbox.clientHeight + listbox.scrollTop;
      const elementBottom = itemRef.current.offsetTop + itemRef.current.offsetHeight;
      if (elementBottom > scrollBottom) {
        listbox.scrollTop = elementBottom - listbox.clientHeight;
      } else if (itemRef.current.offsetTop < listbox.scrollTop) {
        listbox.scrollTop = itemRef.current.offsetTop;
      }
    }
  };

  const focused = focusValue === value;

  useEffect(() => {
    if (focused) {
      ensureVisible();
    }
  }, [focused]);

  const className = (passedClassName + (focused ? 'focused' : '')).trim();
  return (
    <li
      aria-selected={ariaSelected}
      className={className}
      onClick={() => onClick(value)}
      {...props}
      ref={itemRef}
      role="option"
    />
  );
};

ListboxOption.propTypes = {
  // if required is kept on props created in Listbox, incorrect warnings will be thrown
  children: oneOfType([number, string]).isRequired,
  disabled: bool,
  focusValue: string /*.isRequired*/,
  id: string /*.isRequired*/,
  onClick: func /*.isRequired*/,
  selected: oneOfType([array, string]) /*.isRequired*/,
  value: string.isRequired
};

ListboxOption.displayName = 'ListboxOption';

export const sortArray = (array, oldIndex, newIndex) => {
  const sortedArray = array.slice();
  const placeholder = sortedArray[oldIndex];
  sortedArray[oldIndex] = sortedArray[newIndex];
  sortedArray[newIndex] = placeholder;
  return sortedArray;
};
