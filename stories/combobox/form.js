import React, { useState } from 'react';
import { Combobox } from '../../src/components/combobox';

export const Form = ({ selection = 'manual' }) => {
  const [value, setValue] = useState('');
  return (
    <form autoComplete="off">
      <Combobox
        id="example"
        label="Example"
        selection={selection}
        value={value}
        onChange={value => setValue(value)}
      >
        {['One', 'Two', 'Three', 'Four', 'Forth', 'Five']}
      </Combobox>
    </form>
  );
};
