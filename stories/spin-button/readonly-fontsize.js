import React, { useState } from 'react';
import { SpinButton, UpButton, DownButton } from '../../src/spin-button';

export const ReadOnlyFontSize = () => {
  const [value, setValue] = useState(14);
  const valueText = `${value} Point`;
  const max = 40;
  const min = 8;
  return (
    <SpinButton
      aria-label="Font size in points"
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={valueText}
      bigStep={5}
      onChange={setValue}
    >
      <span>{valueText}</span>
      <UpButton>+</UpButton>
      <DownButton>-</DownButton>
    </SpinButton>
  );
};
