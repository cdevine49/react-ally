import React, { useState } from 'react';
import { ListboxOption } from '../../src/components/listbox';
import { Wrapper, Left, Label, ScrollableListbox } from './styles';

const TRANSURANIUM_ELEMENTS = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
  'Mendelevium',
  'Nobelium',
  'Lawrencium',
  'Rutherfordium',
  'Dubnium',
  'Seaborgium',
  'Bohrium',
  'Hassium',
  'Meitnerium',
  'Darmstadtium',
  'Roentgenium',
  'Copernicium',
  'Nihonium',
  'Flerovium',
  'Moscovium',
  'Livermorium',
  'Tennessine',
  'Oganesson'
];

export const SingleScrollable = ({}) => {
  const [selected, setSelected] = useState('');
  return (
    <Wrapper>
      <Left>
        <Label id="ss_elem">Transuranium elements:</Label>
        <ScrollableListbox
          aria-labelledby="ss_elem"
          id="ss_elem_list"
          onChange={child => setSelected(child)}
          value={selected}
        >
          {TRANSURANIUM_ELEMENTS.map(num => (
            <ListboxOption key={num} id={num} value={num}>
              {num}
            </ListboxOption>
          ))}
        </ScrollableListbox>
      </Left>
    </Wrapper>
  );
};
