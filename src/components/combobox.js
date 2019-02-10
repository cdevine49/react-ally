import React, { Fragment, useEffect, useRef, useState } from 'react';
import { array, func, object, oneOf, string } from 'prop-types';
import { Listbox, ListboxOption } from './listbox';

export const Combobox = ({
  id,
  children = [],
  comboboxProps = {},
  label,
  labelProps = {},
  listProps = {},
  listItemProps = {},
  onChange = () => {},
  selection = 'manual',
  value,
  wrapperProps = {},
  ...props
}) => {
  const inputRef = useRef(null);
  const defaultActiveIndex = selection === 'manual' ? -1 : 0;
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [closed, setClosed] = useState(false);

  const comboboxId = `${id}-combobox`;
  const inputId = `${id}-input`;
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;

  const childrenByIndex = {};
  const indexes = [];

  children.forEach((child, index) => {
    if (value && child.substring(0, value.length).toLowerCase() === value.toLowerCase()) {
      indexes.push(index);
      childrenByIndex[index] = child;
    }
  });

  const expanded = !closed && !!indexes.length;

  const resultItemId = index => `${id}-result-item-${index}`;

  const onKeyDown = e => {
    const count = indexes.length;
    switch (e.keyCode) {
      // enter
      case 13:
        e.preventDefault();
        if (expanded && indexes[activeIndex] > -1) {
          setClosed(true);
          onChange(children[indexes[activeIndex]]);
        }
        break;
      // escape
      case 27:
        onChange('');
        break;
      // up arrow
      case 38:
        setActiveIndex(((activeIndex < 0 ? 0 : activeIndex) + count - 1) % count);
        break;
      // down arrow
      case 40:
        setActiveIndex((activeIndex + 1) % count);
        break;
    }
  };

  const originalIndex = indexes[activeIndex];
  const activedescendantId =
    typeof originalIndex === 'undefined' ? undefined : `${resultItemId(originalIndex)}`;

  return (
    <Fragment>
      <label {...labelProps} id={labelId} htmlFor={inputId}>
        {label}
      </label>
      <div {...wrapperProps}>
        <div
          {...comboboxProps}
          aria-expanded={expanded}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          id={comboboxId}
          role="combobox"
        >
          <input
            {...props}
            aria-activedescendant={activedescendantId}
            aria-autocomplete="list"
            aria-controls={listboxId}
            id={inputId}
            onChange={e => {
              setClosed(false);
              setActiveIndex(defaultActiveIndex);
              onChange(e.currentTarget.value);
            }}
            onKeyDown={onKeyDown}
            ref={inputRef}
            type="text"
            value={value}
          />
        </div>
        <Listbox
          {...listProps}
          aria-labelledby={labelId}
          filter={text =>
            value && text.substring(0, value.length).toLowerCase() === value.toLowerCase()
          }
          id={listboxId}
          onChange={onChange}
          style={{ display: expanded ? '' : 'none' }}
          tabIndex={-1}
          value=""
        >
          {children.map(child => (
            <ListboxOption key={child} value={child}>
              {child}
            </ListboxOption>
          ))}
        </Listbox>
      </div>
    </Fragment>
  );
};

Combobox.propTypes = {
  children: array.isRequired,
  comboboxProps: object,
  id: string.isRequired,
  label: string.isRequired,
  labelProps: object,
  listProps: object,
  listItemProps: object,
  onChange: func,
  selection: oneOf([/*'autocomplete', */ 'automatic', 'manual']),
  value: string.isRequired,
  wrapperProps: object
};
