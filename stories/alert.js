import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import LiveRegion, { Alert } from '../src/components/live-region';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const LiveRegionContainer = () => {
  const [alerts, setAlerts] = useState(0);
  const messages = [];
  for (let i = 0; i < alerts; i++) {
    messages.push(<p key={i}>{`Message: ${i}`}</p>);
  }
  return (
    <div>
      <button onClick={() => setAlerts(0)}>Reset</button>
      <button onClick={() => setAlerts(alerts + 1)}>Add Message</button>
      <LiveRegion
        aria-atomic={boolean('Aria-atomic', true)}
        aria-live={text('Aria-live', 'polite')}
        aria-relevant={text('Aria-relevant', 'additions text')}
      >
        {messages}
      </LiveRegion>
    </div>
  );
};

storiesOf('LiveRegions', module)
  .addDecorator(withKnobs)
  .add('LiveRegion', () => <LiveRegion role={'status'}>Hello {3}</LiveRegion>)
  .add('Alert', () => (
    <Alert aria-atomic={false} role="status">
      Hello World
    </Alert>
  ));
