import React from 'react';
import { string } from 'prop-types';

export const Accordion = ({ children, id, ...props }) => (
  <>
    {React.Children.map(children, child =>
      React.cloneElement(child, { accordionId: id, ...props })
    )}
  </>
);

Accordion.propTypes = { id: string.isRequired };
