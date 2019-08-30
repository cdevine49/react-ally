import React from 'react';
import { bool, func, string } from 'prop-types';

export const Button = React.forwardRef(
  ({ active, menuId, setFocusIndex, toggle, ...props }, ref) => {
    return (
      <button
        {...props}
        aria-controls={menuId}
        aria-expanded={active}
        aria-haspopup
        onClick={toggle}
        onKeyDown={e => {
          switch (e.keyCode) {
            case DOWN:
              toggle();
            case UP:
              setFocusIndex(-1);
              toggle();
              break;
          }
        }}
      />
    );
  }
);

Button.propTypes = {
  active: bool.isRequired,
  id: string.isRequired,
  menuId: string.isRequired,
  setFocusIndex: func.isRequired,
  toggle: func.isRequired
};
