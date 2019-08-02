import React from 'react';
import { number } from 'prop-types';
import { willBeIgnored } from '../errors';

export const Slide = ({ count, index, ...props }) => (
  <li
    aria-label={props['aria-labelledby'] ? undefined : `${index} of ${count}`}
    {...props}
    aria-atomic="false"
    aria-roledescription="slide"
    role="group"
  />
);

Slide.propTypes = {
  'aria-roledescription': willBeIgnored('slide'),
  count: number.isRequired,
  index: number.isRequired,
  role: willBeIgnored('group')
};
