import React, { forwardRef, useContext } from 'react';
import { ButtonContext } from './button';

export const CloseButton = forwardRef((props, ref) => {
  const { close } = useContext(ButtonContext);
  return (
    <button
      {...props}
      ref={ref}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        close(e);
      }}
    />
  );
});
