import React, { useRef } from 'react';
import {
  DialogOpenButton,
  DialogCloseButton,
  DialogLabel,
  DialogDescription
} from '../../src/dialog';
import { LastTabbableElement, FirstTabbableElement } from '../../src/focus-trap';
import { RootContent as DialogContent } from './styles';
import { EndOfTheRoad } from './end-of-the-road';

export const Add = props => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  return (
    <DialogOpenButton
      ref={buttonRef}
      modal={
        <DialogContent id="add" ref={contentRef}>
          <DialogLabel>Address Added</DialogLabel>
          <DialogDescription>
            <p>
              The address you provided has been added to your list of delivery addresses. It is
              ready for immediate use. If you wish to remove it, you can do so from{' '}
              <FirstTabbableElement>
                {(props, ref) => (
                  <EndOfTheRoad ref={ref} link {...props}>
                    your profile
                  </EndOfTheRoad>
                )}
              </FirstTabbableElement>
            </p>
          </DialogDescription>
          <LastTabbableElement>
            {({ onKeyDown }, ref) => (
              <DialogCloseButton ref={ref} id="add-close" onKeyDown={onKeyDown}>
                OK
              </DialogCloseButton>
            )}
          </LastTabbableElement>
        </DialogContent>
      }
      {...props}
    >
      Add
    </DialogOpenButton>
  );
};
