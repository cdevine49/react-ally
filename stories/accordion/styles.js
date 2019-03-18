import styled from 'styled-components';
import { AccordionHeader, AccordionPanel } from '../../src/accordion';

export const Wrapper = styled.div`
  border: 1px solid hsl(0, 0%, 82%);
  border-radius: 0.3em;
  box-shadow: 0 1px 2px hsl(0, 0%, 82%);

  & > * + * {
    border-top: 1px solid hsl(0, 0%, 82%);
  }

  h3:first-child {
    button {
      border-radius: 0.3em 0.3em 0 0;
    }
  }
`;

export const Header = styled(AccordionHeader)`
  margin: 0;
  button {
    background: none;
    border: 0;
    color: hsl(0, 0%, 13%);
    display: block;
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    padding: 1em 1.5em;
    position: relative;
    text-align: left;
    width: 100%;

    &:focus,
    &:hover {
      background: hsl(0, 0%, 93%);
    }
  }
`;

export const Icon = styled.span`
  border: solid hsl(0, 0%, 62%);
  border-width: 0 2px 2px 0;
  height: 0.5rem;
  pointer-events: none;
  position: absolute;
  right: 1.5em;
  top: 50%;
  transform: translateY(-60%) rotate(45deg);
  width: 0.5rem;

  ${Header}:focus, ${Header}:hover & {
    border-color: hsl(0, 0%, 13%);
  }

  ${Header} > button[aria-expanded="true"] & {
    transform: translateY(-50%) rotate(-135deg);
  }
`;

export const Panel = styled(AccordionPanel)`
  margin: 0;
  padding: 1em 1.5em;

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;

    input {
      border: 1px solid hsl(0, 0%, 62%);
      border-radius: 0.3em;
      display: block;
      font-size: inherit;
      padding: 0.3em 0.5em;

      &:focus {
        border: 1px solid hsl(0, 0%, 13%);
      }
    }
  }

  &[aria-hidden='true'] {
    padding: 0;
  }
`;
