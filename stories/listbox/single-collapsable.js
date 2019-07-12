import React, { useEffect, useRef, useState } from 'react';
import { ListboxOption } from '../../src/components/listbox';
import {
  CollabsibleWrapper as Wrapper,
  CollabsibleButton,
  Label,
  CollabsibleListBox
} from './styles';

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

export const SingleCollapsable = ({}) => {
  const listRef = useRef(null);
  const [selected, setSelected] = useState(TRANSURANIUM_ELEMENTS[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      listRef.current.focus();
    }
  }, [open]);

  return (
    <Wrapper>
      <Label id="ss_elem">Choose and element:</Label>
      <div>
        <CollabsibleButton
          aria-expanded={open}
          aria-labelledby="ss_elem ss_button"
          aria-haspopup="listbox"
          id="ss_button"
          onClick={() => setOpen(open => !open)}
        >
          {selected}
        </CollabsibleButton>
        {open && (
          <CollabsibleListBox
            aria-labelledby="ss_elem"
            id="ss_elem_list"
            ref={listRef}
            onChange={child => setSelected(child)}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                setOpen(false);
              }
            }}
            value={selected}
          >
            {TRANSURANIUM_ELEMENTS.map(num => (
              <ListboxOption key={num} id={num} value={num}>
                {num}
              </ListboxOption>
            ))}
          </CollabsibleListBox>
        )}
      </div>
    </Wrapper>
  );
};
