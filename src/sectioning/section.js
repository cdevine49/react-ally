import React, { useContext } from 'react';
import { number } from 'prop-types';
import { Level } from './level';

export const Section = ({ children, levelOverride }) => {
  const level = useContext(Level);
  return (
    <Level.Provider value={Math.min(levelOverride || level + 1, 6)}>
      <>{children}</>
    </Level.Provider>
  );
};

Section.propTypes = {
  levelOverride: number
};
