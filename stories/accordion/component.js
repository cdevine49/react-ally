import React from 'react';
import { Header, Icon, Panel, Wrapper } from './styles';
import { boolean } from '@storybook/addon-knobs';
import { AccordionGroup, Accordion } from '../../src/accordion';

export const Component = ({ headingLevel, initialOpen }) => (
  <Wrapper>
    <AccordionGroup
      multi={boolean('multi', true)}
      headingLevel={headingLevel}
      initialOpen={initialOpen}
      id="my-accordion"
    >
      <Accordion className="hello">
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
              <input type="text" value="" name="Name" id="cufc1" aria-required={true} readOnly />
            </p>
            <p>
              <label htmlFor="cufc2">
                Email<span aria-hidden>*</span>:
              </label>
              <input type="text" value="" name="Email" id="cufc2" aria-required={true} readOnly />
            </p>
            <p>
              <label htmlFor="cufc3">Phone:</label>
              <input type="text" value="" name="Phone" id="cufc3" readOnly />
            </p>
            <p>
              <label htmlFor="cufc4">Extension:</label>
              <input type="text" value="" name="Ext" id="cufc4" readOnly />
            </p>
            <p>
              <label htmlFor="cufc5">Country:</label>
              <input type="text" value="" name="Country" id="cufc5" readOnly />
            </p>
            <p>
              <label htmlFor="cufc6">City/Province:</label>
              <input type="text" value="" name="City_Province" id="cufc6" readOnly />
            </p>
          </fieldset>
        </Panel>
      </Accordion>
      <Accordion>
        <Header>
          Billing Address
          <Icon />
        </Header>
        <Panel>
          {' '}
          <fieldset>
            <p>
              <label htmlFor="b-add1">Address 1:</label>
              <input type="text" value="" name="b-add1" id="b-add1" aria-required={true} readOnly />
            </p>
            <p>
              <label htmlFor="b-add2">Address 2:</label>
              <input type="text" value="" name="b-add2" id="b-add2" aria-required={true} readOnly />
            </p>
            <p>
              <label htmlFor="b-city">City:</label>
              <input type="text" value="" name="b-city" id="b-city" readOnly />
            </p>
            <p>
              <label htmlFor="b-state">State:</label>
              <input type="text" value="" name="b-state" id="b-state" readOnly />
            </p>
            <p>
              <label htmlFor="b-zip">Zip Code:</label>
              <input type="text" value="" name="b-zip" id="b-zip" readOnly />
            </p>
          </fieldset>
        </Panel>
      </Accordion>
      <Accordion>
        <Header>
          Shipping Address
          <Icon />
        </Header>
        <Panel>
          <fieldset>
            <p>
              <label htmlFor="m-add1">Address 1:</label>
              <input type="text" value="" readOnly name="m-add1" id="m-add1" />
            </p>
            <p>
              <label htmlFor="m-add2">Address 2:</label>
              <input type="text" value="" readOnly name="m-add2" id="m-add2" />
            </p>
            <p>
              <label htmlFor="m-city">City:</label>
              <input type="text" value="" readOnly name="m-city" id="m-city" />
            </p>
            <p>
              <label htmlFor="m-state">State:</label>
              <input type="text" value="" readOnly name="m-state" id="m-state" />
            </p>
            <p>
              <label htmlFor="m-zip">Zip Code:</label>
              <input type="text" value="" readOnly name="m-zip" id="m-zip" />
            </p>
          </fieldset>
        </Panel>
      </Accordion>
    </AccordionGroup>
  </Wrapper>
);
