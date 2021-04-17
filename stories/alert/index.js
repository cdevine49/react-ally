import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Alert } from '../../src/alert';

storiesOf('Alert', module).add('Alert', () => {
	const [show, setShow] = React.useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Trigger Alert</button>
      <button onClick={() => setShow(false)}>Reset Alert</button>
      <Alert
        style={show ? {
          background: 'hsl(206, 74%, 90%)',
          border: '2px solid hsl(206, 74%, 54%)',
          borderRadius: '4px',
					marginTop: '10px',
          padding: '10px',
					width: '500px',
        } : {}}
      >
		{show ? <p>Hello World</p> : null}
      </Alert>
    </div>
  );
});
