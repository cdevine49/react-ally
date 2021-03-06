import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../src/tabs';

const Example = ({ manual }) => (
  <div>
    <h1>Example</h1>
    <Tabs id="tabs-id">
      <TabList manual={manual}>
        <Tab>Nils Frahm</Tab>
        <Tab>Agnes Obel</Tab>
        <Tab>Joke</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>
            Nils Frahm is a German musician, composer and record producer based in Berlin. He is
            known for combining classical and electronic music and for an unconventional approach to
            the piano in which he mixes a grand piano, upright piano, Roland Juno-60, Rhodes piano,
            drum machine, and Moog Taurus.
          </p>
        </TabPanel>
        <TabPanel>
          <p>
            Agnes Caroline Thaarup Obel is a Danish singer/songwriter. Her first album,
            Philharmonics, was released by PIAS Recordings on 4 October 2010 in Europe.
            Philharmonics was certified gold in June 2011 by the Belgian Entertainment Association
            (BEA) for sales of 10,000 Copies.
          </p>
        </TabPanel>
        <TabPanel>
          <p>Fear of complicated buildings:</p>
          <p>A complex complex complex.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

storiesOf('Tabs', module)
  .add('Automatic Activation', () => <Example />)
  .add('Manual Activation', () => <Example manual />);
