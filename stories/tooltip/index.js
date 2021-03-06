import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tooltip } from '../../src/tooltip';

storiesOf('Tooltip', module)
  .add('span', () => (
    <Tooltip id="more-info" content={<span>Look at me</span>}>
      <button>Show Tooltip</button>
    </Tooltip>
  ))
  .add('ul', () => (
    <Tooltip
      id="explanation"
      content={
        <ul>
          <li>1. First point</li>
          <li>2. And another thing</li>
          <li>3. Lastly...</li>
        </ul>
      }
    >
      <button>Show Tooltip</button>
    </Tooltip>
  ));
