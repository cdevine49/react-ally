import './styles.css';
// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import styled from 'styled-components';
// import { Accordion, AccordionHeader, AccordionContent, AccordionGroup } from '../es/react-ally.js';
// import './button';
// import './alert';
// import './combobox';
import './dialog';
import './focus-trap';
// import './listbox';
// import './radio-group';
// import './tabs';
// import './toolbar';
// import './tooltip';
// import './spin-button';

// const WAIWrapper = styled.div`
//   border: 1px solid hsl(0, 0%, 82%);
//   border-radius: 0.3em;
//   box-shadow: 0 1px 2px hsl(0, 0%, 82%);

//   & > * + * {
//     border-top: 1px solid hsl(0, 0%, 82%);
//   }

//   h3:first-child {
//     button {
//       border-radius: 0.3em 0.3em 0 0;
//     }
//   }
// `;

// const WAIHeader = styled(AccordionHeader)`
//   margin: 0;
//   button {
//     background: none;
//     border: 0;
//     color: hsl(0, 0%, 13%);
//     display: block;
//     font-size: 1rem;
//     font-weight: normal;
//     margin: 0;
//     padding: 1em 1.5em;
//     position: relative;
//     text-align: left;
//     width: 100%;

//     &:focus,
//     &:hover {
//       background: hsl(0, 0%, 93%);
//     }
//   }
// `;

// const Icon = styled.span`
//   border: solid hsl(0, 0%, 62%);
//   border-width: 0 2px 2px 0;
//   height: 0.5rem;
//   pointer-events: none;
//   position: absolute;
//   right: 1.5em;
//   top: 50%;
//   transform: translateY(-60%) rotate(45deg);
//   width: 0.5rem;

//   ${WAIHeader}:focus, ${WAIHeader}:hover & {
//     border-color: hsl(0, 0%, 13%);
//   }

//   ${WAIHeader} > button[aria-expanded="true"] & {
//     transform: translateY(-50%) rotate(-135deg);
//   }
// `;

// const WAIContent = styled(AccordionContent)`
//   margin: 0;
//   padding: 1em 1.5em;

//   fieldset {
//     border: 0;
//     margin: 0;
//     padding: 0;

//     input {
//       border: 1px solid hsl(0, 0%, 62%);
//       border-radius: 0.3em;
//       display: block;
//       font-size: inherit;
//       padding: 0.3em 0.5em;

//       &:focus {
//         border: 1px solid hsl(0, 0%, 13%);
//       }
//     }
//   }

//   &[aria-hidden='true'] {
//     padding: 0;
//   }
// `;

// storiesOf('AccordionGroup', module)
//   .add('No initial props', () => (
//     <AccordionGroup headingLevel={3}>
//       <Accordion id="unique-1">
//         <AccordionHeader
//           className="ah-1"
//           buttonProps={{
//             id: 'ab-1'
//           }}
//         >
//           First Header
//         </AccordionHeader>
//         <AccordionContent>Hello World</AccordionContent>
//       </Accordion>
//       <Accordion id="unique-2">
//         <AccordionHeader
//           className="ah-2"
//           buttonProps={{
//             id: 'ab-2'
//           }}
//         >
//           Second Header
//         </AccordionHeader>
//         <AccordionContent>
//           <button>Focusable</button>
//         </AccordionContent>
//       </Accordion>
//       <Accordion id="unique-1">
//         <AccordionHeader
//           className="ah-1"
//           buttonProps={{
//             id: 'ab-1'
//           }}
//         >
//           Third Header
//         </AccordionHeader>
//         <AccordionContent>Wello Horld</AccordionContent>
//       </Accordion>
//     </AccordionGroup>
//   ))
//   .add('openFirst prop false', () => (
//     <AccordionGroup headingLevel={3} openFirst={false}>
//       <Accordion id="unique-1">
//         <AccordionHeader
//           className="ah-1"
//           buttonProps={{
//             id: 'ab-1'
//           }}
//         >
//           First Header
//         </AccordionHeader>
//         <AccordionContent>Hello World</AccordionContent>
//       </Accordion>
//       <Accordion id="unique-2">
//         <AccordionHeader
//           className="ah-2"
//           buttonProps={{
//             id: 'ab-2'
//           }}
//         >
//           Second Header
//         </AccordionHeader>
//         <AccordionContent>
//           <button>Focusable</button>
//         </AccordionContent>
//       </Accordion>
//       <Accordion id="unique-1">
//         <AccordionHeader
//           className="ah-1"
//           buttonProps={{
//             id: 'ab-1'
//           }}
//         >
//           Third Header
//         </AccordionHeader>
//         <AccordionContent>Wello Horld</AccordionContent>
//       </Accordion>
//     </AccordionGroup>
//   ))
//   .add('exactlyOneOpen prop true', () => (
//     <AccordionGroup exactlyOneOpen headingLevel={3}>
//       <Accordion id="unique-1">
//         <AccordionHeader>First Header</AccordionHeader>
//         <AccordionContent>Hello World</AccordionContent>
//       </Accordion>
//       <Accordion id="unique-2">
//         <AccordionHeader>Second Header</AccordionHeader>
//         <AccordionContent>
//           <button>Focusable</button>
//         </AccordionContent>
//       </Accordion>
//       <Accordion id="unique-1">
//         <AccordionHeader>Third Header</AccordionHeader>
//         <AccordionContent>Wello Horld</AccordionContent>
//       </Accordion>
//     </AccordionGroup>
//   ))
//   .add('WAI example', () => (
//     <WAIWrapper>
//       <AccordionGroup exactlyOneOpen headingLevel={3}>
//         <Accordion id="personal-info">
//           <WAIHeader>
//             Personal Information
//             <Icon />
//           </WAIHeader>
//           <WAIContent>
//             <fieldset>
//               <p>
//                 <label htmlFor="cufc1">
//                   Name<span>*</span>:
//                 </label>
//                 <input type="text" value="" name="Name" id="cufc1" aria-required={true} readOnly />
//               </p>
//               <p>
//                 <label htmlFor="cufc2">
//                   Email<span>*</span>:
//                 </label>
//                 <input type="text" value="" name="Email" id="cufc2" aria-required={true} readOnly />
//               </p>
//               <p>
//                 <label htmlFor="cufc3">Phone:</label>
//                 <input type="text" value="" name="Phone" id="cufc3" readOnly />
//               </p>
//               <p>
//                 <label htmlFor="cufc4">Extension:</label>
//                 <input type="text" value="" name="Ext" id="cufc4" readOnly />
//               </p>
//               <p>
//                 <label htmlFor="cufc5">Country:</label>
//                 <input type="text" value="" name="Country" id="cufc5" readOnly />
//               </p>
//               <p>
//                 <label htmlFor="cufc6">City/Province:</label>
//                 <input type="text" value="" name="City_Province" id="cufc6" readOnly />
//               </p>
//             </fieldset>
//           </WAIContent>
//         </Accordion>
//         <Accordion id="billing-address">
//           <WAIHeader>
//             Billing Address
//             <Icon />
//           </WAIHeader>
//           <WAIContent>
//             <fieldset>
//               <p>
//                 <label htmlFor="b-add1">Address 1:</label>
//                 <input
//                   type="text"
//                   value=""
//                   name="b-add1"
//                   id="b-add1"
//                   aria-required={true}
//                   readOnly
//                 />
//               </p>
//               <p>
//                 <label htmlFor="b-add2">Address 2:</label>
//                 <input
//                   type="text"
//                   value=""
//                   name="b-add2"
//                   id="b-add2"
//                   aria-required={true}
//                   readOnly
//                 />
//               </p>
//               <p>
//                 <label htmlFor="b-city">City:</label>
//                 <input type="text" value="" name="b-city" id="b-city" readOnly />
//               </p>
//               <p>
//                 <label htmlFor="b-state">State:</label>
//                 <input type="text" value="" name="b-state" id="b-state" readOnly />
//               </p>
//               <p>
//                 <label htmlFor="b-zip">Zip Code:</label>
//                 <input type="text" value="" name="b-zip" id="b-zip" readOnly />
//               </p>
//             </fieldset>
//           </WAIContent>
//         </Accordion>
//         <Accordion id="shipping-address">
//           <WAIHeader>
//             Shipping Address
//             <Icon />
//           </WAIHeader>
//           <WAIContent>
//             <fieldset>
//               <p>
//                 <label htmlFor="m-add1">Address 1:</label>
//                 <input type="text" value="" readOnly name="m-add1" id="m-add1" />
//               </p>
//               <p>
//                 <label htmlFor="m-add2">Address 2:</label>
//                 <input type="text" value="" readOnly name="m-add2" id="m-add2" />
//               </p>
//               <p>
//                 <label htmlFor="m-city">City:</label>
//                 <input type="text" value="" readOnly name="m-city" id="m-city" />
//               </p>
//               <p>
//                 <label htmlFor="m-state">State:</label>
//                 <input type="text" value="" readOnly name="m-state" id="m-state" />
//               </p>
//               <p>
//                 <label htmlFor="m-zip">Zip Code:</label>
//                 <input type="text" value="" readOnly name="m-zip" id="m-zip" />
//               </p>
//             </fieldset>
//           </WAIContent>
//         </Accordion>
//       </AccordionGroup>
//     </WAIWrapper>
//   ));
