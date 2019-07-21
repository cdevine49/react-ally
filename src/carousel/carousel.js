import React from 'react';
import { oneOf } from 'prop-types';
import { requiredIfMissing } from '../errors';
import { CarouselContext } from './context';

export const Carousel = ({ children, role, rotating, setRotating }) => {
  return (
    <CarouselContext.Provider value={{ rotating, setRotating }}>
      <div aria-roledescription="carousel" role={role}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.propTypes = {
  'aria-label': requiredIfMissing('aria-labelledby'),
  role: oneOf(['group, region']).isRequired
};
