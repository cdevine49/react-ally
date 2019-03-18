import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { Component } from './component';

const stories = storiesOf('Accordion', module);
stories.addDecorator(withKnobs);
stories.add('Default', () => <Component />);
stories.add('None open', () => <Component initialOpen="none" />);
stories.add('All open', () => <Component initialOpen="all" />);
const headingRange = { range: true, min: 1, max: 6, step: 1 };
stories.add('Heading Level', () => (
  <Component headingLevel={number('headingLevel', 3, headingRange)} />
));
