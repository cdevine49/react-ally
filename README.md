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
import { AccordionGroup, Accordion, AccordionHeader, AccordionContent } from 'react-ally';

const MyAccordion = () => (
  <AccordionGroup headingLevel={3}>
    <Accordion id="first">
      <AccordionHeader>First Header</AccordionHeader>
      <AccordionContent>First Content</AccordionContent>
    </Accordion>
    <Accordion id="second">
      <AccordionHeader className="header-class" buttonProps={{ className="button-class" }}>
        Second Header
      </AccordionHeader>
      <AccordionContent>Second Content</AccordionContent>
    </Accordion>
  </AccordionGroup>
);
```

#### Props

##### AccordionGroup

| Prop           | Default | Required | Valid values | Purpose                                                                                                                                                                                                                                |
| -------------- | ------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exactlyOneOpen | false   | no       | Boolean      | If true: initializes the AccordionGroup with the first accordion open (overriding openFirst={false} if set), closes the current accordion when another is opened, and ensures the current accordion stays open until another is opened |
| openFirst      | true    | no       | Boolean      | If true: initializes the AccordionGroup with the first accordion open                                                                                                                                                                  |
| headingLevel   | none    | yes      | Number 1-6   | Determines the heading level of the Accordions ex. A headingLevel={3} will result in the accordion buttons being wrapped in <h3> tags                                                                                                  |

Only accepts <Accordion> as children

##### Accordion

| Prop | Default | Required | Valid values | Purpose                                          |
| ---- | ------- | -------- | ------------ | ------------------------------------------------ |
| id   | none    | yes      | String       | used to handle aria-controls and aria-labelledby |

Only accepts <AccordionHeader> and <AccordionContent> as children

##### AccordionHeader

The only props used here are the ones the user wishes to spread over the elements. To spread props to the button, pass them in a buttonProps object `<AccordionHeader buttonProps={{/* your props */}}>` all other props will be spread on the heading tag.

##### AccordionContent

All props will be spread over the wrapping div that contains your content

### Live Region

Live regions are used to display content that can change. For example, a div that contains error messages after a form is submitted

```jsx
import { LiveRegion, Alert, Status, Log, ProgressBar, Marquee, Timer } from 'react-ally';

const MyLiveRegion = () => <LiveRegion />;
// Use case: none of the live region roles (Alert, Status, etc.) have correct mix of attributes
// Defaults: aria-atomic={true} aria-live="polite" aria-relevant="additions text"
// Enforced: role={undefined}
// All other props spread over the element

const MyAlert = () => <Alert />;
// Use case: sharing important, time-sensitive information, should be used sparingly
// Defaults: aria-relevant="additions text"
// Enforced: aria-atomic={true} aria-live="assertive" role="alert"
// All other props spread over the element

const MyStatus = () => <Status />;
// Use case: sharing advisory information that the user doesn't need immediately
// Defaults: aria-relevant="additions text"
// Enforced: aria-atomic={true} aria-live="polite" role="status"
// All other props spread over the element

const MyLog = () => <Log />;
// Use case: chat logs, messaging history, game log, an error log
// Defaults: aria-atomic={false} aria-relevant="additions"
// Enforced: aria-live="polite" role="log"
// All other props spread over the element

const MyProgressbar = () => <Progressbar />;
// Use case: informing the user of how far through a long form they have gotten
// Enforced: aria-valuemin={0} aria-valuemax={1} role="progressbar"
// Optional: aria-valuenow={/*Number between 0 and 1*/} (should only be omitted if value is indeterminate)
// All other props spread over the element

const MyMarquee = () => <Marquee />;
// Use case: non-essential, quickly changing information ex: a stock ticker
// Defaults: aria-atomic={false} aria-relevant="additions text"
// Enforced: aria-live={'off'} role="marquee"
// All other props spread over the element

const MyTimer = () => <Timer />;
// Use case: a, um, timer
// Defaults: aria-atomic={false} aria-relevant="additions text"
// Enforced: aria-live={'off'} role="timer"
// All other props spread over the element
```

### Breadcrumb

### Dialog (Modal)

```jsx
import { Dialog, DialogOpenButton, DialogContent } from 'react-ally';

const MyDialog = () => (

  <Dialog initializeOpen={type: Boolean, default: false, purpose: "opens the dialog on initial render"}>
   <DialogOpenButton>Click me to open the dialog</DialogOpenButton>

  {<!-- DialogContent is appended to the document body on open, removed on close  -->}
  {<!-- Make it an Alert Dialog by passing role="alertdialog" to the DialogContent component  -->}
   <DialogContent>
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
