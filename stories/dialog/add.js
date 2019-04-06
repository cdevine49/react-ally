import React, { useRef, useState } from 'react';
import {
  DialogOpenButton,
  DialogCloseButton,
  DialogLabel,
  DialogDescription
} from '../../src/dialog';
import { RootDialog as Dialog } from './styles';
import { EndOfTheRoad } from './end-of-the-road';

export const Add = props => {
  const firstTabbableElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);
  const wrapperRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <>
      <button onClick={open}>Add</button>
      <Dialog
        ref={wrapperRef}
        close={() => setIsOpen(false)}
        firstTabbableElementRef={firstTabbableElementRef}
        id="add-dialog"
        isOpen={isOpen}
        lastTabbableElementRef={lastTabbableElementRef}
      >
        <DialogLabel>Address Added</DialogLabel>
        <DialogDescription>
          <p>
            The address you provided has been added to your list of delivery addresses. It is ready
            for immediate use. If you wish to remove it, you can do so from{' '}
            <EndOfTheRoad ref={firstTabbableElementRef} link>
              your profile
            </EndOfTheRoad>
          </p>
          <button ref={lastTabbableElementRef} onClick={close}>
            OK
          </button>
        </DialogDescription>
      </Dialog>
    </>
  );
};
