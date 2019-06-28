import React, { useState } from 'react';
import { func, string } from 'prop-types';

export const RadioGroup = ({ children, onChange, selected, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div {...props} role="radiogroup">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          tabIndex: (index === activeIndex) - 1,
          onChange,
          selected,
          setActiveIndex: () => setActiveIndex(index)
        })
      )}
    </div>
  );
};

RadioGroup.propTypes = {
  onChange: func.isRequired,
  selected: string.isRequired
};

export const RadioButton = ({
  id,
  label,
  labelProps = {},
  onChange,
  selected,
  setActiveIndex,
  tabIndex,
  value,
  wrapperProps = {},
  ...props
}) => {
  return (
    <div {...wrapperProps}>
      <input
        {...props}
        checked={value === selected}
        id={id}
        onChange={() => {
          onChange(value);
        }}
        onFocus={setActiveIndex}
        tabIndex={tabIndex}
        type="radio"
        value={value}
      />
      <label htmlFor={id} {...labelProps}>
        {label || value}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  value: string.isRequired
};
