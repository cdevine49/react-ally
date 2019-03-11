import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { bool, object, string } from 'prop-types';
import { ESC } from '../keys';
import { ButtonContext } from './button';
import { Overlay } from './overlay';
import { FocusTrap } from '../focus-trap/container';

export const ContentContext = createContext({});
export const Content = React.forwardRef(
  (
    {
      closeOnOverlayClick = true,
      focusLast = false,
      onClick = () => {},
      onKeyDown = () => {},
      overlayBackgroundColor = 'rgba(255,255,255,0.75)',
      overlayProps = {},
      ...props
    },
    ref
  ) => {
    if (!ref) {
      throw new Error('DialogContent requires a ref');
    }

    const [labelledby, setLabelledby] = useState('');
    const [describedby, setDescribedby] = useState('');
    const { close } = useContext(ButtonContext);

    useEffect(() => {
      disableBodyScroll(ref.current);
      return () => {
        enableBodyScroll(ref.current);
      };
    }, []);

    return (
      <ContentContext.Provider
        value={{
          contentId: props.id,
          setDescribedby,
          setLabelledby
        }}
      >
        <Overlay
          backgroundColor={overlayBackgroundColor}
          {...overlayProps}
          onClick={e => {
            if (closeOnOverlayClick) {
              close(e);
            }
          }}
        >
          <FocusTrap
            aria-describedby={describedby}
            aria-labelledby={labelledby}
            aria-modal
            focusLast={focusLast}
            ref={ref}
            role="dialog"
            {...props}
            onClick={e => {
              e.stopPropagation();
              onClick(e);
            }}
            onKeyDown={e => {
              if (e.keyCode === ESC) {
                close(e);
              }
              onKeyDown(e);
            }}
          />
        </Overlay>
      </ContentContext.Provider>
    );
  }
);

Content.displayName = 'DialogContent';

Content.propTypes = {
  closeOnOverlayClick: bool,
  focusLast: bool,
  id: string.isRequired,
  overlayBackgroundColor: string,
  overlayProps: object
};
