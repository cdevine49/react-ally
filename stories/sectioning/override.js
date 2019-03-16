import React from 'react';
import { number } from '@storybook/addon-knobs';
import { Heading, Section } from '../../src/sectioning';

const headingRange = { range: true, min: 1, max: 6, step: 1 };
export const Override = () => (
  <>
    <Heading>Top Level</Heading>
    <Section levelOverride={number('levelOverride', 2, headingRange)}>
      <Heading>Second Level</Heading>
      <Heading>Two</Heading>
    </Section>
  </>
);
