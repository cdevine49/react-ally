import React, { useState } from 'react';
import { bool, number, oneOf, string } from 'prop-types';
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

export const Group = ({
  children,
  multi = true,
  headingLevel,
  initialOpen = 'first',
  ...props
}) => {
  const [openIndexes, setOpen] = useState(initialState(initialOpen, children));
  const open = multi
    ? index => setOpen(prevState => Object.assign({}, prevState, { [index]: !openIndexes[index] }))
    : index => setOpen({ [index]: true });

  logError(!multi && initialOpen === 'all', `Cannot use multi={false} with initialOpen="all"`);

  return (
    <Section levelOverride={headingLevel}>
      <div {...props}>
        <ArrowTrap>
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              accordionId: `${props.id}-${index}th`,
              isOpen: !!openIndexes[index],
              multi,
              onClickHeader: () => open(index)
            })
          )}
        </ArrowTrap>
      </div>
    </Section>
  );
};

Group.propTypes = {
  headingLevel: number,
  id: string.isRequired,
  initialOpen: oneOf(['none', 'first', 'all']),
  multi: bool
};
