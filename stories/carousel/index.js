import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Slide } from '../../src/carousel';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const SlideStory = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    console.log(ref);
  });
  return <Slide ref={ref}></Slide>;
};

storiesOf('SlideStorys', module)
  .addDecorator(withKnobs)
  .add('Example', () => <SlideStory role={'status'}>Hello {3}</SlideStory>);
