import React from 'react';
import { storiesOf } from '@storybook/react';
import { Root } from './root';

storiesOf('Dialog', module).add('No initial props', () => <Root />);
