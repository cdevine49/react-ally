import React, { useContext } from 'react';
import { Button } from './button';
import { SpinButtonContext } from './context';

export const UpButton = props => {
  const { current, onChange, maxValue } = useContext(SpinButtonContext);
  return (
    <Button
      {...props}
      disabled={current === maxValue}
      onClick={() => {
        onChange(prevValue => Math.min(prevValue + 1, maxValue));
      }}
    />
  );
};
