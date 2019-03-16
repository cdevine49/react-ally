import React, { forwardRef, useContext } from 'react';
import { Level } from './level';

export const Heading = forwardRef((props, ref) => {
  const level = useContext(Level);
  const Tag = `h${level}`;
  return <Tag ref={ref} {...props} />;
});
