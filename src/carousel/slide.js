import React from 'react';
import { number } from 'prop-types';

export const Slide = ({ count, index, ...props }) => (
  <div
    aria-label={(props['aria-labelledby']) ? undefined : `${index} of ${count}`}
    {...props}
    aria-roledescription="slide"
    role="group"
    />
);

Slide.propTypes = {
  count: number.isRequired,
  index: number.isRequired
}