import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from './form';

storiesOf('Combobox', module)
  .add('Manual', () => <Form />)
  .add('Automatic', () => <Form selection="automatic" />)
  .add('Autocomplete', () => <Form selection="autocomplete" />);
