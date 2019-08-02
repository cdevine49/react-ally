import React from 'react';
import { useCarouselContext } from './context';
import { willBeIgnored } from '../errors';

export const Slides = props => {
  const { rotating } = useCarouselContext();
  return <ul {...props} aria-atomic={false} aria-live={rotating ? 'off' : 'polite'} />;
};

Slides.propTypes = {
  'aria-atomic': willBeIgnored('false'),
  'aria-live': willBeIgnored('off if rotating or polite if not rotating')
};
