import React, { useState } from 'react';
import { bool, number, oneOf } from 'prop-types';
import { ArrowTrap } from '../arrow-trap';
import { Section } from '../sectioning';
import logError from '../log-error';

const initialState = (initialOpen, children) => {
  switch (initialOpen) {
    case 'none':
      return { 0: false };
    case 'first':
      return { 0: true };
    case 'all':
      const result = {};
      const count = children.length;
      for (let i = 0; i < count; i++) {
        result[i] = true;
      }
      return result;
    default:
      throw new Error();
  }
};

export const Group = ({ children, multi = true, headingLevel, initialOpen = 'first' }) => {
  const [openIndexes, setOpen] = useState(initialState(initialOpen, children));
  const open = multi
    ? index => setOpen(prevState => Object.assign({}, prevState, { [index]: !openIndexes[index] }))
    : index => setOpen({ [index]: true });

  logError(!multi && initialOpen === 'all', `Cannot use multi={false} with initialOpen="all"`);

  return (
    <Section levelOverride={headingLevel}>
      <div>
        <ArrowTrap>
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              multi,
              isOpen: !!openIndexes[index],
              onClickHeader: () => open(index)
            })
          )}
        </ArrowTrap>
      </div>
    </Section>
  );
};

Group.propTypes = {
  initialOpen: oneOf(['none', 'first', 'all']),
  headingLevel: number,
  multi: bool
};
