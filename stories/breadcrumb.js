import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Breadcrumb, CurrentBreadcrumb, Trail } from '../src/breadcrumb';

const Wrapper = styled(Trail)`
  ol {
    list-style: none;
    display: flex;
    flex-direction: row;

    li:not(:first-child) {
      &:before {
        display: inline-block;
        margin: 0 0.25em;
        transform: rotate(15deg);
        border-right: 0.1em solid currentColor;
        height: 0.8em;
        content: '';
      }
    }
  }
`;

const stories = storiesOf('Breadcrumb', module);
stories.add('Breadcrumb', () => (
  <div>
    <Wrapper>
      <Breadcrumb
        href="/users"
        onClick={e => {
          e.preventDefault();
        }}
      >
        Users
      </Breadcrumb>
      <Breadcrumb
        href="/users/10"
        onClick={e => {
          e.preventDefault();
        }}
      >
        User 10
      </Breadcrumb>
      <CurrentBreadcrumb>
        User 10's Profile
      </CurrentBreadcrumb>
    </Wrapper>
  </div>
));
