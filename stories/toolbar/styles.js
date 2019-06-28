import styled from 'styled-components';
import { ToolbarButton, Toolbar as UnStyledToolbar } from '../../src/components/toolbar';
import { SpinButton as UnStyledSpinButton } from '../../src/components/spin-button';
// import { Listbox as UnStyledListbox } from '../../src/components/listbox';

export const Textarea = styled.textarea.attrs({ rows: 20, cols: 80 })`
  border: 2px solid black;
  border-radius: 5px;
  height: 400px;
  font-family: sans-serif;
  font-size: 14px;
  padding: 0.25em;
  width: 1054px;
`;

export const Toolbar = styled(UnStyledToolbar)`
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 6px;
  height: 44px;
  width: 1050px;
  background-color: #ececea;
`;

export const Group = styled.div`
  padding: 0.25em;
  display: block;
  float: left;
`;

const shared = `
  border: 1px solid rgb(255, 255, 255);
  font-family: sans-serif;
  outline: none;
  display: inline-block;
  padding: 6px 12px;
  border-radius: 5px;
  text-align: center;
  background: rgb(255, 255, 255);
  color: #222428;
  font-size: 14px;
  line-height: 1.5em;
  margin-right: 0.25em;

  &:focus, &:focus-within {
    border-width: 2px;
    padding: 5px 11px;
  }

  &:hover,
  &:focus, &:focus-within {
    border-color: #005a9c;
    background: rgb(226, 239, 255);
  }

  &:disabled {
    color: #889;
    cursor: not-allowed;
  }
`;

const StyledButton = styled(ToolbarButton)`
  ${shared}
`;
export const StyledSpinButton = styled(UnStyledSpinButton)`
  ${shared}

  span, button {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  span {
    width: 60px;
  }

  button {
    width: 20px;
    border: 1px solid #ececea;
    border-radius: 3px;
    background-color: #ececea;
    line-height: 1.5em;

    &:last-child {
      margin-left: 3px;
    }
  }
`;

export const CheckboxLabel = styled.label`
  ${shared}
`;

export const Bold = styled(StyledButton).attrs({
  'aria-label': 'Bold',
  children: 'B',
  value: 'bold'
})``;

export const Italicize = styled(StyledButton).attrs({
  'aria-label': 'Italic',
  children: 'I'
})``;

export const Underline = styled(StyledButton).attrs({
  'aria-label': 'Underline',
  children: 'U'
})``;

export const AlignLeft = styled(StyledButton).attrs({
  'aria-label': 'Text align left',
  children: 'Left'
})``;
export const AlignCenter = styled(StyledButton).attrs({
  'aria-label': 'Text align center',
  children: 'Center'
})``;
export const AlignRight = styled(StyledButton).attrs({
  'aria-label': 'Text align right',
  children: 'Right'
})``;

export const Copy = styled(StyledButton).attrs({
  children: 'Copy'
})``;

export const Cut = styled(StyledButton).attrs({
  children: 'Cut'
})``;

export const FontSize = styled(StyledButton)``;
