import React, { FunctionComponent, useState } from 'react';
import { bool, node, string, oneOf } from 'prop-types';
import { ArrowTrap } from '../arrow-trap';
import { Section } from '../sectioning';
import useLogError from '../log-error';

const initialToggleStates = (initialOpen, size) => {
  const toggleStates = new Array(size);
  let i;
  switch (initialOpen) {
    case 'none':
      i = 0;
      break;
    case 'first':
      toggleStates[0] = true;
      i = 1;
      break;
    case 'all':
      for (i = 0; i < size; i++) {
        toggleStates[i] = true;
      }
      break;
    default:
      throw new Error();
  }

  for (i; i < size; i++) {
    toggleStates[i] = false;
  }

  return toggleStates;
};

interface Props {
  allowHideAllPanels?: boolean;
  children: React.ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  id: string;
  initialOpen?: 'all' | 'first' | 'none';
  multi?: boolean;
}

export const Accordion: FunctionComponent = ({
  allowHideAllPanels = true,
  children,
  id,
  initialOpen = 'first',
  headingLevel,
  multi = true,
}: Props) => {
  const [toggleStates, setToggleStates] = useState(
    initialToggleStates(initialOpen, React.Children.count(children)),
  );
  useLogError(
    !multi && initialOpen === 'all',
    `Cannot use multi={false} with initialOpen="all"`,
  );

  const exactlyOneOpen = toggleStates.filter((ts) => ts).length === 1;
  return (
    <Section levelOverride={headingLevel}>
      <ArrowTrap>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            accordionId: `${id}-${index}th`,
            isOpen: toggleStates[index],
            multi,
            toggle: () => {
              setToggleStates((prevToggleStates) => {
                const newToggleStates = prevToggleStates.slice();
                if (!multi) {
                  for (let i = 0; i < prevToggleStates.length; i++) {
                    newToggleStates[i] = false;
                  }
                }
                newToggleStates[index] = !prevToggleStates[index];
                return newToggleStates;
              });
            },
            toggleable: !(
              !allowHideAllPanels &&
              toggleStates[index] &&
              exactlyOneOpen
            ),
          }),
        )}
      </ArrowTrap>
    </Section>
  );
};

Accordion.propTypes = {
  allowHideAllPanels: bool,
  children: node.isRequired,
  id: string.isRequired,
  initialOpen: oneOf(['all', 'first', 'none']),
  headingLevel: oneOf([1, 2, 3, 4, 5, 6]),
  multi: bool,
};
