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

### Section / Heading

```jsx
import { Section, Heading } from 'react-ally';

const MyApp = (
  <>
    <Heading /*h1*/>Top Level</Heading>
    <Section>
      <Heading /*h2*/>Second Level First Sibling</Heading> // <h1 />
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
