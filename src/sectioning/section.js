import React, { useContext } from 'react';
import { number } from 'prop-types';
import { Level } from './level';

export const Section = ({ children, levelOverride, show = false }) => {
  const level = useContext(Level);
  return (
    <Level.Provider value={Math.min(levelOverride || level + 1, 6)}>
      {show ? <section>{children}</section> : <>{children}</>}
    </Level.Provider>
  );
};

Section.propTypes = {
  levelOverride: number
};
