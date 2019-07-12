export const requiredIfMissing = potentiallyMissingProps => {
  return (props, propName, componentName) => {
    if (!Array.isArray(potentiallyMissingProps)) {
      potentiallyMissingProps = [potentiallyMissingProps];
    }

    if (
      potentiallyMissingProps.some(
        potentiallyMissingPropName => !!props[potentiallyMissingPropName]
      )
    ) {
      return null;
    }

    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`
    );
  };
};

export const useSpecializedRole = (propName, componentName) =>
  `\`${componentName}\` doesn't accept a \`${propName}\` prop, if you need to use a specialized role, please use the \`Alert\`, \`Log\`, \`Status\`, \`Progressbar\`, \`Marguee\`, or \`Timer\` component.`;
export const invalidAriaRelevant = (value, propName, componentName) =>
  `Invalid value \`${value}\` for \`${propName}\` supplied to \`${componentName}\`. Validation failed.`;
export const blacklisted = (propName, componentName) =>
  `Invalid prop \`${propName}\` supplied to \`${componentName}\`. The default value for \`${propName}\` will not be overridden.`;
export const zeroToOne = (avn, propName, componentName) =>
  `Invalid value \`${avn}\` for \`${propName}\` supplied to \`${componentName}\`. Validation failed.`;
export const needsAriaLabelOrTitle = (ariaLabel, propName, componentName) =>
  `Invalid value \`${ariaLabel}\` for \`${propName}\` supplied to \`${componentName}\`.  ${componentName} must have either an AlertDialogLabel child or a valid aria-label`;

// Dialog
export const needsDialogLabel = componentName =>
  `\`${componentName}\` expects a \`DialogLabel\` child`;
// AlertDialog
export const needsDialogDescription = componentName =>
  `\`${componentName}\` expects a \`DialogDescription\` child`;
