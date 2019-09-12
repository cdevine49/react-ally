import React from 'react';
import { bool, func, oneOf } from 'prop-types';
import { requiredIfMissing, willBeIgnored } from '../errors';
import { CarouselContext } from './context';

export const Carousel = React.forwardRef(
  ({ rotating = false, setRotating = () => {}, ...props }, ref) => {
    return (
      <CarouselContext.Provider value={{ rotating, setRotating }}>
        <div ref={ref} {...props} aria-roledescription="carousel" />
      </CarouselContext.Provider>
    );
  }
);

Carousel.propTypes = {
  'aria-label': requiredIfMissing('aria-labelledby'),
  'aria-roledescription': willBeIgnored('carousel'),
  role: oneOf(['group', 'region']).isRequired,
  rotating: bool,
  setRotating: func
};

Carousel.displayName = 'Carousel';
