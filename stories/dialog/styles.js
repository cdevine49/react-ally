import styled from 'styled-components';
import { DialogOpenButton, DialogContent } from '../../src/dialog';

export const DialogOpenLink = styled(DialogOpenButton)`
  border: none;
  border-bottom: 1px solid #707070;
  color: #034575;
  font-size: inherit;
  margin: 0 -1px 0;
  padding: 0 1px 0;
  text-decoration: none;

  &:visited {
    border-bottom-color: #bbb;
  }
`;

const BaseDialogContent = styled(DialogContent)`
  position: absolute;
  top: 2rem;
  left: 50vw;
  transform: translateX(-50%);
  min-width: 610px;
  min-height: auto;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.12), 0 15px 12px rgba(0, 0, 0, 0.22);
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid #000;
  background-color: #fff;
  max-height: calc(100vh - 50px);
  overflow: scroll;

  h2 {
    margin-top: 3rem;
    text-align: center;
  }
`;

export const RootContent = styled(BaseDialogContent)`
  form {
    display: flex;
    flex-direction: column;
    line-height: 1.5;
    margin: 15px;

    .input-wrapper {
      &:first-child {
        margin-top: 10px;
      }
      margin: 0 0 10px;
      label {
        box-sizing: border-box;
        padding-right: 0.5em;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        width: 30%;
        text-align: right;
      }
      input {
        max-width: 70%;
        width: 27em;
        &.city {
          width: 17em;
        }
        &.state {
          width: 15em;
        }
        &.zip {
          width: 9em;
        }
      }
      #special-instructions-details {
        box-sizing: border-box;
        padding-right: 0.5em;
        font-size: 12px;
        width: 30%;
        text-align: right;
        display: inline-block;
      }
    }
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px 20px;

    button {
      margin-left: 5px;
    }
  }
`;

export const EndOfTheRoadWrapper = styled(BaseDialogContent)`
  #your-profile-description {
    padding: 10px 20px;
    margin-bottom: 1em;
    p {
      margin-bottom: 0;
    }
  }
  .close {
    display: flex;
    margin: 0 20px 20px auto;
  }
`;
