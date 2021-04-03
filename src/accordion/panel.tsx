import React, { FunctionComponent, forwardRef, useContext } from 'react';
import { node } from 'prop-types';
import { buttonId, contentId } from './aria-helpers';
import { ItemContext } from './item';

interface Props {
  children: React.ReactNode;
}

export const Panel: FunctionComponent = forwardRef(
  (props: Props & React.HTMLProps<HTMLElement>, ref) => {
    const { accordionId, isOpen } = useContext(ItemContext);
    return (
      <div
        ref={ref}
        {...props}
        aria-hidden={!isOpen}
        aria-labelledby={buttonId(accordionId)}
        id={contentId(accordionId)}
        role="region"
      >
        {isOpen && props.children}
      </div>
    );
  },
);

Panel.propTypes = {
  children: node.isRequired,
};

Panel.displayName = 'Panel';
