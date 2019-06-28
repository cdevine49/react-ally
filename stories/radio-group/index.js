import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { RadioGroup, RadioButton } from '../../src/components/radio-group';

const Group = () => {
  const [selected, setSelected] = useState('');
  return (
    <RadioGroup onChange={setSelected} selected={selected}>
      <RadioButton label="Apple" value="apple" />
      <RadioButton label="Banana" value="banana" />
      <RadioButton label="Orange" value="orange" />
    </RadioGroup>
  );
};

storiesOf('Radio Group', module).add('Required', () => <Group />);
