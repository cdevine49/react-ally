import React from 'react';
import { func, node, oneOfType, string } from 'prop-types';
import { useCarouselContext } from './context';
import { willBeIgnored } from '../errors';

export const RotationControl = ({ 'aria-label': ariaLabel, children, ...props }) => {
  const { rotating, setRotating } = useCarouselContext();
  return (
    <button
      {...props}
      aria-label={typeof ariaLabel === 'function' ? ariaLabel(rotating) : ariaLabel}
      aria-pressed={rotating}
      onClick={() => setRotating(rotating => !rotating)}
    >
      {typeof children === 'function' ? children(rotating) : children}
    </button>
  );
};

RotationControl.propTypes = {
  'aria-label': oneOfType([func, string]),
  children: oneOfType([func, node]),
  onClick: willBeIgnored('a function that toggles rotation')
};
