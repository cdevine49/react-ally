import React, { useState } from 'react';
import { ListboxOption } from '../../src/components/listbox';
import { Wrapper, Left, Label, MultiListbox as Listbox, Right } from './styles';

const AVAILABLE = [
  'Leather seats',
  'Front seat warmers',
  'Rear bucket seats',
  'Rear seat warmers',
  'Front sun roof',
  'Rear sun roof',
  'Privacy cloque',
  'Food synthesizer',
  'Advanced waste recycling system',
  'Turbo vertical take-off capability'
];

export const MultiDual = () => {
  const [available, setAvailable] = useState(AVAILABLE);
  const [chosen, setChosen] = useState([]);
  const [selected, setSelected] = useState([]);
  const [chosenSelected, setChosenSelected] = useState([]);
  const [deleteDown, setDeleteDown] = useState(false);
  const [enterDown, setEnterDown] = useState(false);
  const [altLeftArrowDown, setAltLeftArrowDown] = useState(false);
  const [altRightArrowDown, setAltRightArrowDown] = useState(false);

  const add = () => {
    if (selected) {
      setAvailable(available => {
        return available.filter(el => selected.indexOf(el) === -1);
      });
      setChosen(chosen => chosen.concat(selected));
      setSelected([]);
    }
  };

  const remove = () => {
    if (chosenSelected) {
      setChosen(chosen => {
        const nextChosen = chosen.slice();
        nextChosen.splice(nextChosen.indexOf(chosenSelected), 1);
        return nextChosen;
      });
      setAvailable(available => available.concat(chosenSelected));
      setChosenSelected([]);
    }
  };

  return (
    <Wrapper>
      <Left>
        <Label id="ss_elem">Available upgrades:</Label>
        <Listbox
          aria-labelledby="ss_elem"
          id="ss_elem_list"
          onChange={child => setSelected(child)}
          onKeyDown={e => {
            if (e.keyCode === 39 && e.altKey) {
              setAltRightArrowDown(true);
              if (deleteDown) {
                add();
              }
            } else if (e.keyCode === 8) {
              setDeleteDown(true);
              if (altRightArrowDown) {
                add();
              }
            }
          }}
          onKeyUp={e => {
            if (e.keyCode === 39) {
              setAltRightArrowDown(false);
            } else if (e.keyCode === 8) {
              setDeleteDown(false);
            }
          }}
          value={selected}
        >
          {available.map(perk => (
            <ListboxOption key={perk} value={perk}>
              {perk}
            </ListboxOption>
          ))}
        </Listbox>
        <button
          aria-disabled={!selected}
          aria-keyshortcuts="Alt+ArrowRight Enter"
          disabled={!selected}
          onClick={add}
        >
          Add
        </button>
      </Left>
      <Right>
        <Label id="ss_unimp_l">Upgrades you have chosen:</Label>
        <div>
          <Listbox
            aria-labelledby="ss_unimp_l"
            id="ss_unimp_list"
            onChange={child => setChosenSelected(child)}
            onKeyDown={e => {
              if (e.keyCode === 37 && e.altKey) {
                setAltLeftArrowDown(true);
                if (enterDown) {
                  remove();
                }
              } else if (e.keyCode === 13) {
                setEnterDown(true);
                if (altLeftArrowDown) {
                  remove();
                }
              }
            }}
            onKeyUp={e => {
              if (e.keyCode === 37) {
                setAltLeftArrowDown(false);
              } else if (e.keyCode === 13) {
                setEnterDown(false);
              }
            }}
            value={chosenSelected}
          >
            {chosen.map(perk => (
              <ListboxOption key={perk} value={perk}>
                {perk}
              </ListboxOption>
            ))}
          </Listbox>
        </div>
        <button
          aria-disabled={!chosenSelected}
          aria-keyshortcuts="Alt+ArrowLeft Enter"
          disabled={!chosenSelected}
          onClick={remove}
        >
          Remove
        </button>
      </Right>
    </Wrapper>
  );
};
