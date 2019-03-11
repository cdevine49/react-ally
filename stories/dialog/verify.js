import React, { useRef } from 'react';
import { DialogOpenButton, DialogLabel, DialogDescription, DialogCloseButton } from '../../src';
import {
  FirstTabbableElement,
  LastTabbableElement,
  InitialFocusElement
} from '../../src/focus-trap';
import { RootContent as VerifyContent } from './styles';
import { EndOfTheRoad } from './end-of-the-road';

export const Verify = () => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const alternativeRef = useRef(null);
  const modal = (
    <VerifyContent ref={contentRef} id="verify">
      <DialogLabel>Verification Result</DialogLabel>
      <DialogDescription>
        <div>
          <InitialFocusElement>
            {ref => (
              <p ref={ref} tabIndex="-1">
                This is just a demonstration. If it were a real application, it would provide a
                message telling whether the entered address is valid.
              </p>
            )}
          </InitialFocusElement>
          <p>
            For demonstration purposes, this dialog has a lot of text. It demonstrates a scenario
            where:
          </p>
          <ul>
            <li>The first interactive element, the help link, is at the bottom of the dialog.</li>
            <li>
              If focus is placed on the first interactive element when the dialog opens, the
              validation message may not be visible.
            </li>
            <li>
              If the validation message is visible and the focus is on the help link, then the focus
              may not be visible.
            </li>
            <li>
              When the dialog opens, it is important that both:
              <ul>
                <li>
                  The beginning of the text is visible so users do not have to scroll back to start
                  reading.
                </li>
                <li>The keyboard focus always remains visible.</li>
              </ul>
            </li>
          </ul>
          <p>There are several ways to resolve this issue:</p>
          <ul>
            <li>Place an interactive element at the top of the dialog, e.g., a button or link.</li>
            <li>
              Make a static element focusable, e.g., the dialog title or the first block of text.
            </li>
          </ul>
          <p>
            Please <em>DO NOT </em> make the element with role dialog focusable!
          </p>
          <ul>
            <li>
              The larger a focusable element is, the more difficult it is to visually identify the
              location of focus, especially for users with a narrow field of view.
            </li>
            <li>
              The dialog has a visual border, so creating a clear visual indicator of focus when the
              entire dialog has focus is not very feasible.
            </li>
            <li>
              Screen readers read the label and content of focusable elements. The dialog contains
              its label and a lot of content! If a dialog like this one has focus, the actual focus
              is difficult to comprehend.
            </li>
          </ul>
          <p>
            In this dialog, the first paragraph has{' '}
            <code>
              tabindex=<q>-1</q>
            </code>
            . The first paragraph is also contained inside the element that provides the dialog
            description, i.e., the element that is referenced by <code>aria-describedby</code>. With
            some screen readers, this may have one negative but relatively insignificant side effect
            when the dialog opens -- the first paragraph may be announced twice. Nonetheless, making
            the first paragraph focusable and setting the initial focus on it is the most broadly
            accessible option.
          </p>
        </div>
      </DialogDescription>
      <div className="actions">
        <FirstTabbableElement>
          {(props, ref) => (
            <EndOfTheRoad ref={ref} link {...props}>
              link to help
            </EndOfTheRoad>
          )}
        </FirstTabbableElement>
        <EndOfTheRoad ref={alternativeRef}>accepting an alternative form</EndOfTheRoad>
        <LastTabbableElement>
          {(props, ref) => (
            <DialogCloseButton ref={ref} {...props}>
              Close
            </DialogCloseButton>
          )}
        </LastTabbableElement>
      </div>
    </VerifyContent>
  );
  return (
    <DialogOpenButton ref={buttonRef} modal={modal}>
      Verify Address
    </DialogOpenButton>
  );
};
