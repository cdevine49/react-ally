import React from 'react';
import { oneOf, string } from 'prop-types';
import { requiredIfMissing } from '../errors';

export const Carousel = ({ children, role }) => {
  return (
    <div aria-roledescription="carousel" role={role}>
      {children}
    </div>
  );
};

Carousel.propTypes = {
  'aria-label': requiredIfMissing('aria-labelledby'),
  role: oneOf(['group, region']).isRequired
};
