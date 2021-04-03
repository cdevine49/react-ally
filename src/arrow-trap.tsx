import React, { FunctionComponent } from 'react';
import { END, HOME, UP, DOWN, LEFT, RIGHT } from './keys';

export const FocusContext = React.createContext({
  onKeyDown: () => {
    /* Initialize function as empty */
  },
  register: () => {
    /* Initialize function as empty */
  },
});

export const ArrowTrap: FunctionComponent = ({
  allowHorizontal = true,
  allowJump = true,
  allowVertical = true,
  children,
}) => {
  const [elements, setElements] = React.useState([]);
  const onKeyDown = ({ keyCode }) => {
    const count = elements.length;
    const currentFocusedElementIndex = () =>
      elements.findIndex((el) => el === document.activeElement);
    switch (keyCode) {
      case HOME:
        if (!allowJump) {
          break;
        }
        elements[0].focus();
        break;
      case END:
        if (!allowJump) {
          break;
        }
        elements[count - 1].focus();
        break;
      case LEFT:
        if (!allowHorizontal) {
          break;
        }
      case UP:
        if (!allowVertical) {
          break;
        }
        const prevIndex = (currentFocusedElementIndex() + count - 1) % count;
        elements[prevIndex].focus();
        break;
      case RIGHT:
        if (!allowHorizontal) {
          break;
        }
      case DOWN:
        if (!allowVertical) {
          break;
        }
        const nextIndex = (currentFocusedElementIndex() + 1) % count;
        elements[nextIndex].focus();
        break;
    }
  };

  const register = React.useCallback((element) => {
    setElements((prevElements) => prevElements.concat([element]));
  }, []);

  return (
    <FocusContext.Provider value={{ register, onKeyDown }}>
      {children}
    </FocusContext.Provider>
  );
};
