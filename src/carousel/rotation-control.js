import React from 'react';
import { bool, func } from 'prop-types';

export const RotationControl = ({ rotating, setRotating, ...props }) => (
  <button {...props} aria-pressed={rotating} onClick={() => setRotating(rotating => !rotating)} />
);

RotationControl.propTypes = {
  rotating: bool.isRequired,
  setRotating: func.isRequired
};
