import React, { useContext, useEffect, useRef } from 'react';
import { DialogContext } from './context';

export const Label = props => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  const { setLabelledby, contentId } = useContext(DialogContext);
  const id = `${contentId}-label`;
  if (!mounted.current) {
    setLabelledby(id);
  }

  return <h2 {...props} id={id} />;
};
