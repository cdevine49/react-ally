import React, { Fragment, useState } from 'react';
import { element, oneOfType, string } from 'prop-types';

export const Tooltip = ({
  children: child,
  content,
  id,
  onBlur = () => {},
  onFocus = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  style = {}
}) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const visible = focused || hovered;
  return (
    <Fragment>
      {child &&
        React.cloneElement(child, {
          'aria-describedby': id,
          onBlur: e => {
            setFocused(false);
            onBlur(e);
          },
          onFocus: e => {
            setFocused(true);
            onBlur(e);
          },
          onMouseEnter: e => {
            setHovered(true);
            onMouseEnter(e);
          },
          onMouseLeave: e => {
            setHovered(false);
            onMouseLeave(e);
          }
        })}
      {content &&
        React.cloneElement(content, {
          'aria-hidden': !visible,
          id,
          role: 'tooltip',
          style: { ...style, display: visible ? 'inherit' : 'none' }
        })}
    </Fragment>
  );
};

Tooltip.propTypes = {
  children: element.isRequired,
  content: element.isRequired,
  id: string.isRequired
};
