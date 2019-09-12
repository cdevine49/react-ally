import React from 'react';
import { func, node, oneOfType, string } from 'prop-types';
import { useCarouselContext } from './context';
import { requiredIfMissing, willBeIgnored } from '../errors';

export const RotationControl = React.forwardRef(
  ({ 'aria-label': ariaLabel, children, ...props }, ref) => {
    const { rotating, setRotating } = useCarouselContext();
    return (
      <button
        ref={ref}
        {...props}
        aria-label={typeof ariaLabel === 'function' ? ariaLabel(rotating) : ariaLabel}
        aria-pressed={rotating}
        onClick={() => setRotating(rotating => !rotating)}
      >
        {typeof children === 'function' ? children(rotating) : children}
      </button>
    );
  }
);

RotationControl.propTypes = {
  children: requiredIfMissing('aria-label'),
  onClick: willBeIgnored('a function that toggles rotation')
};

RotationControl.displayName = 'RotationControl';
