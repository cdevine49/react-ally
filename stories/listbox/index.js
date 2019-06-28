import React from 'react';
import { storiesOf } from '@storybook/react';
import { SingleScrollable } from './single-scrollable';
import { SingleRearrangeableDual } from './single-rearrangeable-dual';
import { SingleCollapsable } from './single-collapsable';
import { MultiDual } from './multi-dual';

storiesOf('Listbox', module)
  .add('Single Scrollable', () => <SingleScrollable />)
  .add('Single Rearrangeable', () => <SingleRearrangeableDual />)
  .add('Single Collapsable', () => <SingleCollapsable />)
  .add('Multi Dual', () => <MultiDual />);
