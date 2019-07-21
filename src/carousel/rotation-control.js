import React from 'react';
import { bool, func } from 'prop-types';
import { useCarouselContext } from './context';

export const RotationControl = props => {
  const { rotating, setRotating } = useCarouselContext();
  return (
    <button {...props} aria-pressed={rotating} onClick={() => setRotating(rotating => !rotating)} />
  );
};

RotationControl.propTypes = {
  rotating: bool.isRequired,
  setRotating: func.isRequired
};
