import React, { useRef } from 'react';
import { DialogOpenButton, DialogCloseButton, DialogLabel } from '../../src/dialog';
import { FirstTabbableElement, LastTabbableElement } from '../../src/focus-trap';
import { RootContent as DialogContent } from './styles';
import { Add } from './add';
import { Verify } from './verify';

export const Root = () => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  return (
    <div>
      <h1>Accessible Modal</h1>
      <DialogOpenButton
        ref={buttonRef}
        initializeOpen
        modal={
          <DialogContent
            ref={contentRef}
            closeOnOverlayClick={false}
            id="delivery-address-form"
            overlayBackgroundColor="rgba(0, 0, 0, 0.3)"
          >
            <DialogLabel>Add Delivery Address</DialogLabel>
            <form>
              <div className="input-wrapper">
                <label>Street:</label>
                <FirstTabbableElement>
                  {({ onKeyDown }, ref) => (
                    <input ref={ref} className="street" onKeyDown={onKeyDown} />
                  )}
                </FirstTabbableElement>
              </div>
              <div className="input-wrapper">
                <label>City:</label>
                <input className="city" />
              </div>
              <div className="input-wrapper">
                <label>State:</label>
                <input className="state" />
              </div>
              <div className="input-wrapper">
                <label>Zip:</label>
                <input className="zip" />
              </div>
              <div className="input-wrapper">
                <label>Special instructions:</label>
                <input aria-describedby="special-instructions-details" className="special" />
                <div id="special-instructions-details">
                  For example, gate code or other information to help the driver find you
                </div>
              </div>
            </form>
            <div className="actions">
              <Verify />
              <Add />
              <LastTabbableElement>
                {({ onKeyDown }, ref) => (
                  <DialogCloseButton ref={ref} onKeyDown={onKeyDown}>
                    Cancel
                  </DialogCloseButton>
                )}
              </LastTabbableElement>
            </div>
          </DialogContent>
        }
      >
        Add Delivery Address
      </DialogOpenButton>
    </div>
  );
};
