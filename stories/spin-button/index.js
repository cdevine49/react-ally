import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReadOnlyFontSize } from './readonly-fontsize';
import { checkA11y } from '@storybook/addon-a11y';

storiesOf('Spin Button', module)
  // .addDecorator(checkA11y)
  .add('Readonly Font Size', () => <ReadOnlyFontSize />);
