import React from 'react';
import { func, number, string } from 'prop-types';
import { SpinButtonContext } from './context';
import { END, HOME, UP, DOWN, PAGEUP, PAGEDOWN } from '../keys';

export const SpinButton = React.forwardRef(
  (
    { bigStep = 1, onChange, onKeyDown = () => {}, onMouseDown = () => {}, tabIndex = 0, ...props },
    ref
  ) => {
    const current = props['aria-valuenow'],
      maxValue = props['aria-valuemax'],
      minValue = props['aria-valuemin'];

    const handleKeyDown = e => {
      switch (e.keyCode) {
        case PAGEUP:
          onChange(prevValue => Math.min(prevValue + bigStep, maxValue));
          break;
        case PAGEDOWN:
          onChange(prevValue => Math.max(prevValue - bigStep, minValue));
          break;
        case END:
          onChange(maxValue);
          break;
        case HOME:
          onChange(minValue);
          break;
        case UP:
          onChange(prevValue => Math.min(prevValue + 1, maxValue));
          break;
        case DOWN:
          onChange(prevValue => Math.max(prevValue - 1, minValue));
          break;
        default:
          break;
      }
      onKeyDown(e);
    };

    return (
      <SpinButtonContext.Provider
        value={{
          current,
          maxValue,
          minValue,
          onChange
        }}
      >
        <div
          {...props}
          ref={ref}
          role="spinbutton"
          onKeyDown={handleKeyDown}
          onMouseDown={e => {
            ref.current.focus();
            onMouseDown(e);
          }}
          tabIndex={tabIndex}
        />
      </SpinButtonContext.Provider>
    );
  }
);

SpinButton.displayName = 'SpinButton';

SpinButton.propTypes = {
  'aria-valuemax': number.isRequired,
  'aria-valuemin': number.isRequired,
  'aria-valuenow': number.isRequired,
  'aria-valuetext': string,
  bigStep: number,
  onChange: func.isRequired
};
