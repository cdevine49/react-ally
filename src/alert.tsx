import React, { FunctionComponent } from 'react';
import { bool, oneOf } from 'prop-types';

export const Alert: FunctionComponent = (
  props: React.HTMLAttributes<HTMLElement>,
) => <div {...props} aria-atomic aria-live="assertive" role="alert" />;
