import React, { forwardRef } from 'react';
import { buttonId, contentId } from './aria-helpers';

export const Panel = forwardRef(
  (
    {
      accordionId,
      multi: ignoredMulti,
      focused: ignoredFocused,
      isOpen,
      onClickHeader: ignoredOnClick,
      setFocusOnKeyDown: ignoredSetFocus,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      {...props}
      aria-hidden={!isOpen}
      aria-labelledby={buttonId(accordionId)}
      id={contentId(accordionId)}
    >
      {isOpen && props.children}
    </div>
  )
);
