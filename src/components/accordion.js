import React, { Fragment, useState, useEffect, useRef } from 'react';
import { bool, number, object, string } from 'prop-types';
// Props for initial settings
// exactlyOneOpen -- opens first accordion and ensures one accordion always open
// openFirst -- opens first accordion, but allows user to close it

export const AccordionGroup = ({ children, exactlyOneOpen, headingLevel, openFirst }) => {
  const initialOpenHash = { 0: exactlyOneOpen || openFirst };

  const [openIndexes, open] = useState(initialOpenHash);
  const [focusIndex, setFocusIndex] = useState();

  const onKeyDown = ({ keyCode }, index) => {
    const count = React.Children.count(children);
    switch (keyCode) {
      // end
      case 35:
        setFocusIndex(count - 1);
        break;
      // home
      case 36:
        setFocusIndex(0);
        break;
      // up arrow
      case 38:
        setFocusIndex((index + count - 1) % count);
        break;
      // down arrow
      case 40:
        setFocusIndex((index + 1) % count);
        break;
    }
  };
  return (
    <Fragment>
      {React.Children.map(children, (child, index) => {
        const displayName = child.type.displayName;
        if (['Accordion', 'Styled(Accordion)'].find(el => el === displayName)) {
          return React.cloneElement(child, {
            focus: focusIndex === index,
            headingLevel,
            onKeyDown: e => onKeyDown(e, index),
            open: () =>
              open(
                exactlyOneOpen
                  ? { [index]: true }
                  : Object.assign({}, openIndexes, { [index]: !openIndexes[index] })
              ),
            isOpen: !!openIndexes[index]
          });
        }
      })}
    </Fragment>
  );
};

AccordionGroup.defaultProps = { exactlyOneOpen: false, openFirst: true };
AccordionGroup.propTypes = {
  exactlyOneOpen: bool,
  headingLevel: number.isRequired,
  openFirst: bool
};

export const Accordion = ({
  children,
  focus,
  headingLevel: level,
  id,
  isOpen,
  open: onClick,
  onKeyDown
}) => {
  return (
    <Fragment>
      {React.Children.map(children, child => {
        const displayName = child && child.type && child.type.displayName;
        const buttonId = `${id}-button`;
        const contentId = `${id}-content`;
        if (['AccordionHeader', 'Styled(AccordionHeader)'].find(el => el === displayName)) {
          return React.cloneElement(child, {
            ariaControls: contentId,
            ariaExpanded: isOpen,
            buttonId: buttonId,
            focus,
            level,
            onClick,
            onKeyDown
          });
        }
        if (['AccordionContent', 'Styled(AccordionContent)'].find(el => el === displayName)) {
          return React.cloneElement(child, {
            ariaLabelledBy: buttonId,
            id: contentId,
            isOpen
          });
        }
      })}
    </Fragment>
  );
};

Accordion.propTypes = { id: string.isRequired };
Accordion.displayName = 'Accordion';

export const AccordionHeader = ({
  ariaControls,
  ariaExpanded,
  buttonProps,
  buttonId,
  focus,
  level,
  onClick,
  onKeyDown,
  ...props
}) => {
  const buttonRef = useRef();
  useEffect(
    () => {
      if (focus) {
        buttonRef.current.focus();
      }
    },
    [focus]
  );
  const Tag = `h${level}`;
  return (
    <Tag {...props}>
      <button
        {...buttonProps}
        ref={buttonRef}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        id={buttonId}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {props.children}
      </button>
    </Tag>
  );
};

// Add custom prop validation for level to be between 1 and 6
AccordionHeader.propTypes = { buttonProps: object };
AccordionHeader.displayName = 'AccordionHeader';

export const AccordionContent = ({ ariaLabelledBy, isOpen, ...props }) => {
  return (
    <div {...props} aria-hidden={!isOpen} aria-labelledby={ariaLabelledBy}>
      {isOpen && props.children}
    </div>
  );
};

AccordionContent.displayName = 'AccordionContent';
