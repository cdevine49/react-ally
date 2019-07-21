import React from 'react';
import { useCarouselContext } from './context';

export const Slides = props => {
  const { rotating } = useCarouselContext();
  console.log(rotating);
  return <ul {...props} aria-atomic={false} aria-live={rotating ? 'off' : 'polite'} />;
};
