import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import { object } from 'prop-types';
import { buttonId, contentId } from './aria-helpers';
import { Heading } from '../sectioning';

export const Header = forwardRef(
  (
    {
      accordionId,
      buttonProps,
      multi,
      focused,
      isOpen,
      onClickHeader,
      setFocusOnKeyDown,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef(null);

    useEffect(() => {
      if (focused) {
        buttonRef.current.focus();
      }
    }, [focused]);

    return (
      <Heading ref={ref} {...props}>
        <button
          {...buttonProps}
          ref={buttonRef}
          aria-disabled={isOpen && !multi}
          aria-expanded={isOpen}
          aria-controls={contentId(accordionId)}
          id={buttonId(accordionId)}
          onClick={onClickHeader}
          onKeyDown={setFocusOnKeyDown}
        >
          {props.children}
        </button>
      </Heading>
    );
  }
);

// Add custom prop validation for level to be between 1 and 6
Header.propTypes = { buttonProps: object };
