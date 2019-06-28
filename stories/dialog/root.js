import React, { useRef, useState } from 'react';
import { DialogLabel, DialogHelpers } from '../../src/dialog';
import { RootDialog as Dialog } from './styles';
import { Add } from './add';
import { Verify } from './verify';

export const Root = () => {
  const { open, ...dialogHelpers } = DialogHelpers();
  const returnFocus = useRef(null);
  return (
    <div>
      <h1>Accessible Modal</h1>
      <button ref={returnFocus} onClick={open}>
        Add Delivery Address
      </button>
      <Dialog
        id="root-dialog"
        overlayBackgroundColor="rgba(0, 0, 0, 0.3)"
        {...dialogHelpers}
        returnFocus={returnFocus}
      >
        <DialogLabel>Add Delivery Address</DialogLabel>
        <form>
          <div className="input-wrapper">
            <label htmlFor="street">Street:</label>
            <input ref={dialogHelpers.firstTabbableElementRef} id="street" className="street" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="city">City:</label>
            <input id="city" className="city" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="state">State:</label>
            <input id="state" className="state" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="zip">Zip:</label>
            <input id="zip" className="zip" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="special">Special instructions:</label>
            <input
              id="special"
              aria-describedby="special-instructions-details"
              className="special"
            />
            <div id="special-instructions-details">
              For example, gate code or other information to help the driver find you
            </div>
          </div>
        </form>
        <div className="actions">
          <Verify />
          <Add />
          <button ref={dialogHelpers.lastTabbableElementRef} onClick={dialogHelpers.close}>
            Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
};
