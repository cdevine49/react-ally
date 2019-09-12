import React, { useEffect } from 'react';
import { useCarouselContext } from './context';
import { willBeIgnored } from '../errors';

export const Slides = React.forwardRef(({ children, ...props }, ref) => {
  const { rotating } = useCarouselContext();

  return (
    <ul ref={ref} {...props} aria-atomic={false} aria-live={rotating ? 'off' : 'polite'}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          index,
          count: children.length
        })
      )}
    </ul>
  );
});

Slides.propTypes = {
  'aria-atomic': willBeIgnored('false'),
  'aria-live': willBeIgnored('off if rotating or polite if not rotating')
};

Slides.displayName = 'Slides';
