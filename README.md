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

### Dialog (Modal)

```jsx
import {
  Dialog,
  DialogOpenButton,
  DialogCloseButton,
  DialogContent,
  DialogLabel,
  DialogContent,
  DialogFirstTabbableElement,
  DialogLastTabbableElement,
  DialogLeastDangerousElement
} from 'react-ally';

const MyDialog = () => (

  <Dialog initializeOpen={type: Boolean, default: false, purpose: "opens the dialog on initial render"}>
   <DialogOpenButton
   {...propsSpreadOverElement}
   >
      Click me to open the dialog
    </DialogOpenButton>

  {<!-- DialogContent is appended to the document body on open, removed on close  -->}
  {<!-- Make it an Alert Dialog by passing role="alertdialog" to the DialogContent component  -->}
   <DialogContent
    closeOnOverlayClick={
      type: Boolean,
      default: true,
      purpose: "determines whether clicking on overlay closes modal"
    }
    focusOnLast={
      type: Boolean,
      default: false,
      purpose="gives initial focus to LastTabbableElement, unless LeastDangerousElement exists"
    }
    overlayBackgroundColor={
      type: String,
      default: "rgba(255,255,255,0.75)",
      purpose="set overlay background color"
    }
    overlayProps={type: Object, default: {}, purpose="spread over overlay div element"}
    {...otherPropsSpreadOverDialogContentElement}
   >
      <DialogLabel
        id={type: String, required: true, purpose: "used in DialogContent's aria-label"}
        {...otherPropsSpreadOverElement}
        >
        Required Header Label
      </DialogLabel>
      <DialogDescription
        id={type: String, required: true, purpose: "used in DialogContent's aria-describedby"}
        {...otherPropsSpreadOverElement}
        >
        Optional Description of the dialog's purpose (required if role="alertdialog")
      </DialogDescription>

      {<!-- Required to keep focus inside the dialog  -->}
      <DialogFirstTabbableElement>
        <button>Take Permanent Action</button>
      </DialogFirstTabbableElement>

      {<!-- Gets initial focus, use when FirstTabbableElement is a dangerous action  -->}
      <DialogLeastDangerousElement>
        <DialogCloseButton>Close</DialogCloseButton>
      </DialogLeastDangerousElement>

      {<!-- Required to keep focus inside the dialog  -->}
      <DialogLastTabbableElement>
        <a href="www.google.com">Google</a>
      </DialogLastTabbableElement>
   </DialogContent>
  </Dialog>
);
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Conor Devine**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
