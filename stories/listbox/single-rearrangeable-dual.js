import React, { useState } from 'react';
import { ListboxOption, sortArray } from '../../src/components/listbox';
import { Wrapper, Left, Label, ScrollableListbox, Right } from './styles';

const FEATURES = [
  'Proximity of public K-12 schools',
  'Proximity of child-friendly parks',
  'Proximity of grocery shopping',
  'Proximity of fast food',
  'Proximity of fine dining',
  'Neighborhood walkability',
  'Availability of public transit',
  'Proximity of hospital and medical services',
  'Level of traffic noise',
  'Access to major highways'
];

export const SingleRearrangeableDual = () => {
  const [important, setImportant] = useState(FEATURES);
  const [unimportant, setUnimportant] = useState([]);
  const [selected, setSelected] = useState('');
  const [unimportantSelected, setUnimportantSelected] = useState('');
  const [deleteDown, setDeleteDown] = useState(false);
  const [enterDown, setEnterDown] = useState(false);
  const [altLeftArrowDown, setAltLeftArrowDown] = useState(false);
  const [altRightArrowDown, setAltRightArrowDown] = useState(false);

  const onClickUnimportant = () => {
    if (selected) {
      setImportant(important => {
        const nextImportant = important.slice();
        nextImportant.splice(nextImportant.indexOf(selected), 1);
        return nextImportant;
      });
      setUnimportant(unimportant => unimportant.concat(selected));
      setSelected('');
      setUnimportantSelected(selected);
    }
  };

  const onClickImportant = () => {
    if (unimportantSelected) {
      setUnimportant(unimportant => {
        const nextUnimportant = unimportant.slice();
        nextUnimportant.splice(nextUnimportant.indexOf(unimportantSelected), 1);
        return nextUnimportant;
      });
      setImportant(important => important.concat(unimportantSelected));
      setSelected(unimportantSelected);
      setUnimportantSelected('');
    }
  };

  return (
    <Wrapper>
      <Left>
        <Label id="ss_elem">Important Features:</Label>
        <ScrollableListbox
          aria-labelledby="ss_elem"
          id="ss_elem_list"
          onChange={child => setSelected(child)}
          onKeyDown={e => {
            if (e.keyCode === 39 && e.altKey) {
              setAltRightArrowDown(true);
              if (deleteDown) {
                onClickUnimportant();
              }
            } else if (e.keyCode === 8) {
              setDeleteDown(true);
              if (altRightArrowDown) {
                onClickUnimportant();
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
          sort={(oldIndex, newIndex) =>
            setImportant(important => sortArray(important, oldIndex, newIndex))
          }
          value={selected}
        >
          {important.map(perk => (
            <ListboxOption key={perk} value={perk}>
              {perk}
            </ListboxOption>
          ))}
        </ScrollableListbox>
        <div role="toolbar" aria-label="Actions">
          <button
            aria-disabled={!selected}
            aria-keyshortcuts="Alt+ArrowUp"
            disabled={!selected}
            onClick={() =>
              setImportant(important => {
                const oldIndex = important.indexOf(selected);
                const nextIndex = oldIndex === 0 ? important.length : oldIndex - 1;
                return sortArray(important, oldIndex, nextIndex);
              })
            }
          >
            Up
          </button>
          <button
            aria-disabled={!selected}
            aria-keyshortcuts="Alt+ArrowDown"
            disabled={!selected}
            onClick={() =>
              setImportant(important => {
                const oldIndex = important.indexOf(selected);
                const nextIndex = oldIndex === important.length ? 0 : oldIndex + 1;
                return sortArray(important, oldIndex, nextIndex);
              })
            }
          >
            Down
          </button>
          <button
            aria-disabled={!selected}
            aria-keyshortcuts="Alt+ArrowRight Delete"
            disabled={!selected}
            onClick={onClickUnimportant}
          >
            Not Important
          </button>
        </div>
      </Left>
      <Right>
        <Label id="ss_unimp_l">Important Features:</Label>
        <div>
          <ScrollableListbox
            aria-labelledby="ss_unimp_l"
            id="ss_unimp_list"
            onChange={child => setUnimportantSelected(child)}
            onKeyDown={e => {
              if (e.keyCode === 37 && e.altKey) {
                setAltLeftArrowDown(true);
                if (enterDown) {
                  onClickImportant();
                }
              } else if (e.keyCode === 13) {
                setEnterDown(true);
                if (altLeftArrowDown) {
                  onClickImportant();
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
            value={unimportantSelected}
          >
            {unimportant.map(perk => (
              <ListboxOption key={perk} value={perk}>
                {perk}
              </ListboxOption>
            ))}
          </ScrollableListbox>
        </div>
        <button
          aria-disabled={!unimportantSelected}
          aria-keyshortcuts="Alt+ArrowLeft Enter"
          disabled={!unimportantSelected}
          onClick={onClickImportant}
        >
          Important
        </button>
      </Right>
    </Wrapper>
  );
};
