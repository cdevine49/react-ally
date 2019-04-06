import { useRef, useState } from 'react';

export const Helpers = (initializeOpen = false) => {
  const firstTabbableElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(initializeOpen);

  return {
    close: () => setIsOpen(false),
    firstTabbableElementRef,
    isOpen,
    lastTabbableElementRef,
    open: () => setIsOpen(true),
    ref: wrapperRef
  };
};
