import React, { useContext } from 'react';
import { Button } from './button';
import { SpinButtonContext } from './context';

export const DownButton = props => {
  const { current, onChange, minValue } = useContext(SpinButtonContext);
  return (
    <Button
      {...props}
      disabled={current === minValue}
      onClick={() => {
        onChange(prevValue => Math.max(prevValue - 1, minValue));
      }}
    />
  );
};
