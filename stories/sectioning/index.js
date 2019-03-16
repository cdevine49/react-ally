import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { StructuredHeadings } from './structured-headings';
import { Override } from './override';

storiesOf('Sectioning', module)
  .addDecorator(withKnobs)
  .add('Structured Headings', () => <StructuredHeadings />)
  .add('Override', () => <Override />);
