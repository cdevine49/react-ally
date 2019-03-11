import React, { forwardRef, useRef } from 'react';
import {
  DialogCloseButton,
  DialogDescription,
  DialogFirstTabbableElement,
  DialogLabel,
  DialogOpenButton
} from '../../src/dialog';
import { DialogOpenLink, EndOfTheRoadWrapper } from './styles';

export const EndOfTheRoad = forwardRef(({ link, ...props }, buttonRef) => {
  const contentRef = useRef(null);
  const modal = (
    <EndOfTheRoadWrapper id="end-of-the-road" ref={contentRef}>
      <DialogLabel>End of the Road!</DialogLabel>
      <DialogDescription>
        You activated a fake link or button that goes nowhere! The link or button is present for
        demonstration purposes only.
      </DialogDescription>
      <DialogFirstTabbableElement>
        {(props, ref) => (
          <DialogCloseButton ref={ref} className="close" {...props}>
            Close
          </DialogCloseButton>
        )}
      </DialogFirstTabbableElement>
    </EndOfTheRoadWrapper>
  );

  const Wrapper = link ? DialogOpenLink : DialogOpenButton;

  return <Wrapper ref={buttonRef} modal={modal} {...props} />;
});
