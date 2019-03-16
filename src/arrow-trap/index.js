import React, { useState } from 'react';
import { END, HOME, UP, DOWN, LEFT, RIGHT } from '../keys';

export const ArrowTrap = ({ children }) => {
  const [focusIndex, setFocusIndex] = useState();
  const onKeyDown = ({ keyCode }, index) => {
    const count = React.Children.count(children);
    const next = () => setFocusIndex((index + 1) % count);
    const prev = () => setFocusIndex((index + count - 1) % count);
    switch (keyCode) {
      case HOME:
        setFocusIndex(0);
        break;
      case END:
        setFocusIndex(count - 1);
        break;
      case LEFT:
        prev();
        break;
      case RIGHT:
        next();
        break;
      case UP:
        prev();
        break;
      case DOWN:
        next();
        break;
    }
  };
  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          focused: index === focusIndex,
          setFocusOnKeyDown: e => onKeyDown(e, index)
        })
      )}
    </>
  );
};
