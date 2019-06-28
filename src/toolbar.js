import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ToolbarContext = createContext({});
export const Toolbar = ({ 'aria-controls': ariaControls, children, ...props }) => {
  const buttons = useRef([]);
  const isMounting = useRef(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
    } else {
      buttons.current[activeIndex].current.focus();
    }
  }, [activeIndex]);

  return (
    <ToolbarContext.Provider value={{ activeIndex, buttons, setActiveIndex }}>
      <div aria-controls={ariaControls} {...props} role="toolbar" tabIndex={-1}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {});
        })}
      </div>
    </ToolbarContext.Provider>
  );
};

export const ToolbarButton = ({
  'aria-disabled': ariaDisabled,
  disabled,
  onClick,
  onFocus = () => {},
  onKeyDown = () => {},
  ...props
}) => {
  const button = useRef(null);
  const mounting = useRef(true);
  const { activeIndex, buttons, setActiveIndex } = useContext(ToolbarContext);

  const currentIndex = () => buttons.current.indexOf(button);

  useEffect(() => {
    mounting.current = false;
  }, []);

  if (mounting.current) {
    buttons.current.push(button);
  }

  useEffect(() => {
    return () => {
      buttons.current.splice(buttons.current.indexOf(button), 1);
    };
  }, []);

  const handleFocus = e => {
    setActiveIndex(currentIndex());
    onFocus(e);
  };

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 39:
        e.preventDefault();
        setActiveIndex((currentIndex() + 1) % buttons.current.length);
        break;
      case 37:
        e.preventDefault();
        setActiveIndex((currentIndex() - 1 + buttons.current.length) % buttons.current.length);
        break;
      default:
        break;
    }
    onKeyDown(e);
  };

  const active = buttons.current.indexOf(button) === activeIndex;
  const tabIndex = active - 1;
  if (typeof props.children === 'function') {
    return props.children({
      buttonRef: button,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      tabIndex
    });
  }
  const isDisabled = ariaDisabled || disabled;
  return (
    <button
      ref={button}
      aria-disabled={isDisabled}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onClick={isDisabled ? () => {} : onClick}
      {...props}
      tabIndex={tabIndex}
    />
  );
};

ToolbarButton.displayName = 'ToolbarButton';
