import React, { useState } from 'react';
import { END, HOME, UP, DOWN, LEFT, RIGHT } from '../keys';

export const ArrowTrap = ({ children, toolbarItem = false }) => {
  const [focusIndex, setFocusIndex] = useState();
  const onKeyDown = ({ keyCode }, index) => {
    const count = React.Children.count(children);
    const next = () => setFocusIndex((index + 1) % count);
    const prev = () => setFocusIndex((index + count - 1) % count);
    switch (keyCode) {
      case HOME:
        if (!toolbarItem) {
          setFocusIndex(0);
        }
        break;
      case END:
        if (!toolbarItem) {
          setFocusIndex(count - 1);
        }
        break;
      case LEFT:
        if (!toolbarItem || index > 0) {
          prev();
        }
        break;
      case RIGHT:
        if (!toolbarItem || index + 1 === count) {
          next();
        }
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
          setFocusOnKeyDown: e => {
            onKeyDown(e, index)
          }
        })
      )}
    </>
  );
};
