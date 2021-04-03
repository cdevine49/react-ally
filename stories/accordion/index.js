import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { AccordionWrapper, Header, Icon, Panel, Props } from './styles';
import { Accordion, Item } from '../../src/accordion';

const stories = storiesOf('Accordion', module);
stories.add('Accordion', () => {
  const [allowHideAllPanels, setAllowHideAllPanels] = useState(true);
  const [headingLevel, setHeadingLevel] = useState(3);
  const [initialOpen, setInitialOpen] = useState('first');
  const [multi, setMulti] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <AccordionWrapper
        key={`${allowHideAllPanels}-${headingLevel}-${initialOpen}-${multi}`}
      >
        <Accordion
          allowHideAllPanels={allowHideAllPanels}
          headingLevel={headingLevel}
          id="my-accordion"
          initialOpen={initialOpen}
          multi={multi}
        >
          <Item className="hello">
            <Header>
              Personal Information
              <Icon />
            </Header>
            <Panel>
              <fieldset>
                <p>
                  <label htmlFor="cufc1">
                    Name<span aria-hidden>*</span>:
                  </label>
                  <input
                    type="text"
                    value=""
                    name="Name"
                    id="cufc1"
                    aria-required={true}
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="cufc2">
                    Email<span aria-hidden>*</span>:
                  </label>
                  <input
                    type="text"
                    value=""
                    name="Email"
                    id="cufc2"
                    aria-required={true}
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="cufc3">Phone:</label>
                  <input
                    type="text"
                    value=""
                    name="Phone"
                    id="cufc3"
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="cufc4">Extension:</label>
                  <input type="text" value="" name="Ext" id="cufc4" readOnly />
                </p>
                <p>
                  <label htmlFor="cufc5">Country:</label>
                  <input
                    type="text"
                    value=""
                    name="Country"
                    id="cufc5"
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="cufc6">City/Province:</label>
                  <input
                    type="text"
                    value=""
                    name="City_Province"
                    id="cufc6"
                    readOnly
                  />
                </p>
              </fieldset>
            </Panel>
          </Item>
          <Item>
            <Header>
              Billing Address
              <Icon />
            </Header>
            <Panel>
              {' '}
              <fieldset>
                <p>
                  <label htmlFor="b-add1">Address 1:</label>
                  <input
                    type="text"
                    value=""
                    name="b-add1"
                    id="b-add1"
                    aria-required={true}
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="b-add2">Address 2:</label>
                  <input
                    type="text"
                    value=""
                    name="b-add2"
                    id="b-add2"
                    aria-required={true}
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="b-city">City:</label>
                  <input
                    type="text"
                    value=""
                    name="b-city"
                    id="b-city"
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="b-state">State:</label>
                  <input
                    type="text"
                    value=""
                    name="b-state"
                    id="b-state"
                    readOnly
                  />
                </p>
                <p>
                  <label htmlFor="b-zip">Zip Code:</label>
                  <input
                    type="text"
                    value=""
                    name="b-zip"
                    id="b-zip"
                    readOnly
                  />
                </p>
              </fieldset>
            </Panel>
          </Item>
          <Item>
            <Header>
              Shipping Address
              <Icon />
            </Header>
            <Panel>
              <fieldset>
                <p>
                  <label htmlFor="m-add1">Address 1:</label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    name="m-add1"
                    id="m-add1"
                  />
                </p>
                <p>
                  <label htmlFor="m-add2">Address 2:</label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    name="m-add2"
                    id="m-add2"
                  />
                </p>
                <p>
                  <label htmlFor="m-city">City:</label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    name="m-city"
                    id="m-city"
                  />
                </p>
                <p>
                  <label htmlFor="m-state">State:</label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    name="m-state"
                    id="m-state"
                  />
                </p>
                <p>
                  <label htmlFor="m-zip">Zip Code:</label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    name="m-zip"
                    id="m-zip"
                  />
                </p>
              </fieldset>
            </Panel>
          </Item>
        </Accordion>
      </AccordionWrapper>
      <Props>
        <label>
          Allow all panels to be collapsed
          <input
            checked={allowHideAllPanels}
            onChange={() => setAllowHideAllPanels((prev) => !prev)}
            type="checkbox"
          />
        </label>
        <label>
          Allow multiple panels to be expanded
          <input
            checked={multi}
            onChange={() => setMulti((prev) => !prev)}
            type="checkbox"
          />
        </label>
        <label>
          Set heading level
          <input
            min={1}
            max={6}
            onChange={(e) => setHeadingLevel(e.target.value)}
            type="number"
            value={headingLevel}
          />
        </label>
        <label>
          Set initial open panel(s)
          <select
            onChange={(e) => setInitialOpen(e.target.value)}
            value={initialOpen}
          >
            <option value="first">First</option>
            <option value="all">All</option>
            <option value="none">None</option>
          </select>
        </label>
      </Props>
    </div>
  );
});
