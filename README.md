# React Ally

React Ally is an accessible component library built to match the wai-aria spec

## Getting Started

If you are using npm as your package manager:

```sh
npm install --save react-ally
```

If you're using another bundler, you can [access the files on unpkg](https://unpkg.com/react-ally/)

If you'd rather bring in react-ally through a script tag, you can find UMD builds in the ['dist' folder](https://unpkg.com/react-ally/dist)

## Components

### Accordion

```jsx
import React from 'react'
import
{ AccordionGroup, Accordion, AccordionHeader, AccordionPanel }
from 'react-ally';

const MyAccordion = () => (
  <AccordionGroup
    /*
    Number between 1 and 6 which sets the level of accordion headers.
    If using the Section / Heading components in this library, those
    will handle the level for you.
  */
    headingLevel={2}
    /*
    String used on the wrapping div and to create the ids + aria attributes
    on the Headers and Contents.
  */
    id="example-id"
    /*
    One of "none", "first", "all"
    Determines which of the accordions start opened.
  */
    initialOpen="first"
    /*
    Boolean that determines whether multiple accordions can be open at once.
  */
    multi={true}
  >
    <Accordion>
      <AccordionHeader
      /*
        Object of props added to the header button.  Other props will be added
        to the heading tag.
      */
        buttonProps={{ className="button-class" }}
      >
        First Header
      </AccordionHeader>
      <AccordionPanel>First Content</AccordionPanel>
    </Accordion>
    <Accordion>
      <AccordionHeader>Second Header</AccordionHeader>
      <AccordionPanel>Second Content</AccordionPanel>
    </Accordion>
  </AccordionGroup>
);
```

### Breadcrumb

```jsx
import React from 'react'
import { Breadcrumb, BreadcrumbLink } from 'react-ally';

const MyBreadcrumb = () => (
  <Breadcrumb
  /*
    Object of props added to the <ol/> tag.  Other props are spread
    over the wrapping <nav /> tag.
  */
    listProps={{
      className="example-ol-class"
    }}
  >
    <BreadcrumbLink
    /*
     Required link destination
    */
      href="/main"
    /*
      Object of props added to the <li/> tag.  Other props are spread
      over the inner <a /> tag.
    */
      listItemProps={{
        className="example-li-class"
      }}
    >
      Main
    </BreadcrumbLink>
    <BreadcrumbLink href="/main/nested">Nested</BreadcrumbLink>
    <BreadcrumbLink href="/main/nested/current">Current</BreadcrumbLink>
  </Breadcrumb>
);
```

### Dialog

```jsx
import React, { useRef, useState } from 'react';
import { Dialog, DialogDescription, DialogLabel } from 'react-ally';

const MyDialog = () => {
  const firstTabbableElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState();

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <Dialog
        ref={wrapperRef}
        /*
          Function that closes the dialog on overlayClick or escape keydown
        */
        close={() => setIsOpen(false)}
        /*
          Boolean that determines if clicking the overlay closes the dialog.
        */
        closeOnOverlayClick={true}
        /*
          Ref belonging to the first tabbable element in the dialog.
          Used to trap focus.
          Will recieve initial focus unless the initialFocusElementRef prop is passed.
        */
        firstTabbableElementRef={firstTabbableElementRef}
        /*
          String that acts as the dialog's id as well as creating ids and aria
          attributes for the dialog's optional label and description
        */
        id="add-dialog"
        /*
          Ref that gets initial focus on mount.
          Defaults to firstTabbableElementRef.
        */
        initialFocusElementRef={firstTabbableElementRef}
        /*
          Boolean that determines if the dialog is open
        */
        isOpen={isOpen}
        /*
          Ref belonging to the last tabbable element in the dialog.
          Used to trap focus.
        */
        lastTabbableElementRef={lastTabbableElementRef}
        /*
          String determining the background-color of the overlay
        */
        overlayBackgroundColor="rgba(255,255,255,0.75)"
        /*
          Object spread out over the overlay div.  If a style prop is passed,
          it will be respected, but overlayBackgroundColor will override
          any backgroundColor style passed in here.
        */
        overlayProps={{}}
        /*
          Ref which will receive focus when the dialog closes.  Defaults to
          the activeElement when the dialog was opened.  If there was no
          activeElement when the dialog opened, it will cause an error.
        */
        returnFocus={{ current: document.activeElement }}
      >
        <DialogLabel>I am the header</DialogLabel>
        <DialogDescription>I explain the dialog in more depth</DialogDescription>
        <input ref={firstTabbableElementRef}>First tabbable element</button>
        <a href="#">A link</button>
        <button
          ref={lastTabbableElementRef}
          onClick={() => setIsOpen(false)}
        >
          Last tabbable element closes the dialog
        </button>
      </Dialog>
    </>
  );
};
```

### FocusTrap

```jsx
import React, { useRef } from 'react';
import { FocusTrap } from 'react-ally';

const MyFocusTrap = () => {
  const firstTabbableElementRef = useRef(null);
  const lastTabbableElementRef = useRef(null);
  const wrapperRef = useRef(null);

  return (
    <FocusTrap
      /*
        Ref belonging to the first tabbable element in the focus trap.
        Used to trap focus.
        Will recieve initial focus unless the initialFocusElementRef prop is passed.
      */
      firstTabbableElementRef={firstTabbableElementRef}
      /*
        Ref that gets initial focus on mount.
        Defaults to firstTabbableElementRef.
      */
      initialTabbableElementRef={firstTabbableElementRef}
      /*
        Ref belonging to the last tabbable element in the dialog.
        Used to trap focus.
      */
      lastTabbableElementRef={lastTabbableElementRef}
      /*
        Ref belonging to the top-level child element of the focus trap.
      */
      wrapperRef={wrapperRef}
    >
      <div ref={wrapperRef}>
        <button ref={firstTabbableElementRef}>First</button>
        <button>Middle</button>
        <button ref={lastTabbableElementRef}>Last</button>
      </div>
    </FocusTrap>
  );
};
```

### Section / Heading

```jsx
import React from 'react';
import { Section, Heading } from 'react-ally';

const MyApp = (
  <>
    <Heading /*h1*/>Top Level</Heading>
    <Section>
      <Heading /*h2*/>Second Level First Sibling</Heading>
      <Section>
        <Heading /*h3*/>Third Level</Heading>
      </Section>
    </Section>
    <Section>
      <Heading /*h2*/>Second Level Second Sibling</Heading>
    </Section>
    <Section
    /*
      Number that overrides the the heading level for this section and
      its children.  Main use case is if adding <Section /> components
      piecemeal to an existing app.
    */
      levelOverride={4}

    /*
      Boolean that puts an html section element in the dom when true
    */
      show={false}
    >
      <Heading /*h4*/>Fourth Level By Override</Heading>
    </Section>
  </>
);
```

### Spin Button

```jsx
import React { useState } from 'react';
import { SpinButton, UpButton, DownButton } from 'react-ally';

const MySpinButton = {
  const [value, setValue] = useState(50);
  return (
    <SpinButton
      aria-label="Number from 0 to 100"
      /*
        Number - the upper limit of the value
      */
      aria-valuemax={100}
      /*
        Number - the lower limit of the value
      */
      aria-valuemin={0}
      /*
        Number - the current value
      */
      aria-valuenow={value}
      /*
        Function - sets the value
      */
      onChange={setValue}
    >
      <DownButton>-</DownButton>
      {value}
      <UpButton>+</UpButton>
    </SpinButton>
  );
};
```

### Tabs

```jsx
import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'react-ally';

const MyTabs = () => (
  <Tabs
    /*
      String that sets the ids and related aria attributes on tabs and panels
    */
    id="example-tabs-id"
  >
    <TabList
      /*
        Boolean determining whether focusing a tab activates it
      */
      manual={false}
    >
      <Tab>Animals</Tab>
      <Tab>Vegetables</Tab>
      <Tab>Minerals</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Cats and Dogs</TabPanel>
      <TabPanel>Peas and Carrots</TabPanel>
      <TabPanel>Rocks</TabPanel>
    </TabPanels>
  </Tabs>
);
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Conor Devine**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
