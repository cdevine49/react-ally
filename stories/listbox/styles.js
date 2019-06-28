import styled from 'styled-components';
import { Listbox as UnStyledListbox } from '../../src/components/listbox';

export const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #aaa;
  display: flex;
  padding: 20px;
  min-width: 700px;
  max-width: 800px;
`;

export const CollabsibleWrapper = styled(Wrapper)`
  flex-direction: column;
`;

export const Left = styled.div`
  padding-right: 10px;
  width: 50%;
`;

export const Right = styled.div`
  padding-left: 10px;
  width: 50%;
`;

export const Label = styled.span`
  color: black;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 21px;
`;

export const Listbox = styled(UnStyledListbox)`
  background: white;
  border: 1px solid #aaa;
  list-style: none;
  min-height: 18em;
  overflow-y: auto;
  padding: 0px;
  position: relative;
  li {
    line-height: 1.8em;
    margin: 0.25em 0 0.5em;
    padding: 0 1em;
    position: relative;

    &.focused[aria-selected='true'] {
      background: #bde4ff;
    }
  }
`;

export const ScrollableListbox = styled(Listbox)`
  max-height: 18em;

  &:focus {
    outline: -webkit-focus-ring-color auto 5px;
  }
`;

export const MultiListbox = styled(Listbox)`
  li {
    &.focused {
      background: #bde4ff;
    }

    &[aria-selected='true'] {
      &:before {
        content: '✓';
        position: absolute;
        left: 0.25em;
      }
    }
  }
`;

export const CollabsibleButton = styled.button`
  border-radius: 0;
  font-size: 16px;
  text-align: left;
  padding: 5px 10px;
  width: 150px;
  position: relative;

  &:after {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #aaa;
    content: ' ';
    position: absolute;
    right: 5px;
    top: 10px;
  }
`;

export const CollabsibleListBox = styled(Listbox)`
  border-top: 0;
  max-height: 10em;
  overflow-y: auto;
  position: absolute;
  margin: 0;
  width: 148px;
`;
