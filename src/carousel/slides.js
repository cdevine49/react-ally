import React from 'react';

export const Slides = ({ rotating = false, ...props }) => (
  <ul {...props} aria-atomic={false} aria-live={rotating ? 'off' : 'polite'} />
);
