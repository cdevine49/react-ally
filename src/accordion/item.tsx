import React, { FunctionComponent } from 'react';
import { node } from 'prop-types';

export const ItemContext = React.createContext({});

interface Props {
  children: React.ReactNode;
}

export const Item: FunctionComponent = ({
  accordionId,
  children,
  isOpen,
  multi,
  toggle,
  toggleable,
}: Props) => {
  return (
    <ItemContext.Provider
      value={{ accordionId, isOpen, multi, toggle, toggleable }}
    >
      {children}
    </ItemContext.Provider>
  );
};

Item.propTypes = {
  children: node.isRequired,
};
