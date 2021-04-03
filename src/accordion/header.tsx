import React, {
  FunctionComponent,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { node, object } from 'prop-types';
import { buttonId, contentId } from './aria-helpers';
import { ItemContext } from './item';
import { Heading } from '../sectioning';
import { FocusContext } from '../arrow-trap';

interface Props {
  children: React.ReactNode;
  buttonProps?: {
    [key: React.HTMLProps<HTMLElement>]: boolean | number | string;
  };
}

export const Header: FunctionComponent = forwardRef(
  (
    { buttonProps, children, ...props }: Props & React.HTMLProps<HTMLElement>,
    ref,
  ) => {
    const buttonRef = useRef(null);
    const { onKeyDown, register } = useContext(FocusContext);
    const { accordionId, isOpen, toggle, toggleable } = useContext(ItemContext);
    useEffect(() => {
      register(buttonRef.current);
    }, [register]);

    return (
      <Heading ref={ref} {...props}>
        <button
          {...buttonProps}
          ref={buttonRef}
          aria-disabled={!toggleable}
          aria-expanded={isOpen}
          aria-controls={contentId(accordionId)}
          id={buttonId(accordionId)}
          onClick={() => toggleable && toggle()}
          onKeyDown={onKeyDown}
        >
          {children}
        </button>
      </Heading>
    );
  },
);

Header.propTypes = {
  children: node.isRequired,
  buttonProps: object,
};

Header.displayName = 'Header';
