import React, { useContext, useEffect, useRef } from 'react';
import { ContentContext } from './content';

export const Description = props => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  const { setDescribedby, contentId } = useContext(ContentContext);
  const id = `${contentId}-description`;
  if (!mounted.current) {
    setDescribedby(id);
  }

  return <div {...props} id={id} />;
};
