import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Breadcrumb, BreadcrumbLink } from '../src/breadcrumb';
import { checkA11y } from '@storybook/addon-a11y';

const Wrapper = styled(Breadcrumb)`
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
stories.addDecorator(checkA11y);
stories.add('Current page is link', () => (
  <div>
    <Wrapper>
      <BreadcrumbLink
        href="/users"
        onClick={e => {
          e.preventDefault();
        }}
      >
        Users
      </BreadcrumbLink>
      <BreadcrumbLink
        href="/users/10"
        onClick={e => {
          e.preventDefault();
        }}
      >
        User 10
      </BreadcrumbLink>
      <BreadcrumbLink
        href="/users/10/profile"
        onClick={e => {
          e.preventDefault();
        }}
      >
        User 10's Profile
      </BreadcrumbLink>
    </Wrapper>
  </div>
));
