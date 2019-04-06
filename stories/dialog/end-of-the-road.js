import React, { forwardRef, useRef, useState } from 'react';
import { DialogDescription, DialogLabel } from '../../src/dialog';
import { DialogOpenLink, EndOfTheRoadWrapper } from './styles';

export const EndOfTheRoad = forwardRef(({ link, ...props }, ref) => {
  const firstTabbableElementRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const OpenElement = link ? DialogOpenLink : 'button';

  return (
    <>
      <OpenElement ref={ref} onClick={open}>
        {props.children}
      </OpenElement>
      <EndOfTheRoadWrapper
        ref={wrapperRef}
        close={() => setIsOpen(false)}
        firstTabbableElementRef={firstTabbableElementRef}
        id="end-dialog"
        isOpen={isOpen}
      >
        <DialogLabel>End of the Road!</DialogLabel>
        <DialogDescription>
          You activated a fake link or button that goes nowhere! The link or button is present for
          demonstration purposes only.
        </DialogDescription>
        <button ref={firstTabbableElementRef} onClick={close}>
          Close
        </button>
      </EndOfTheRoadWrapper>
    </>
  );
});
