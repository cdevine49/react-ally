import React from 'react';
import { number } from 'prop-types';
import { willBeIgnored } from '../errors';

export const Slide = React.forwardRef(({ count, index, ...props }, ref) => (
  <li
    ref={ref}
    aria-label={props['aria-labelledby'] ? undefined : `${index} of ${count}`}
    {...props}
    aria-roledescription="slide"
    role="group"
  />
));

Slide.propTypes = {
  'aria-roledescription': willBeIgnored('slide'),
  count: number.isRequired,
  index: number.isRequired,
  role: willBeIgnored('group')
};

Slide.displayName = 'Slide';
