import React from 'react';
import { bool, oneOf } from 'prop-types';
import { blacklisted, invalidAriaRelevant, useSpecializedRole, zeroToOne } from '../errors';

const _validateAriaRelevant = (props, propName, componentName) => {
  if (!props[propName]) {
    return;
  }
  const rs = props[propName].split(' ');
  for (let i = 0; i < rs.length; i++) {
    if (!['additions', 'removals', 'text', 'all'].some(r => r === rs[i])) {
      return new Error(invalidAriaRelevant(rs[i], propName, componentName));
    }
  }
};

const _ensureNoRole = (props, propName, componentName) => {
  if (props[propName]) {
    return new Error(useSpecializedRole(propName, componentName));
  }
};

const _ensureUndefined = (props, propName, componentName) => {
  if (typeof props[propName] !== 'undefined') {
    debugger;
    return new Error(blacklisted(propName, componentName));
  }
};

const LiveRegion = props => {
  return <div aria-atomic={true} aria-live="polite" aria-relevant="additions text" {...props} role={undefined} />;
};

export default LiveRegion;

LiveRegion.propTypes = {
  'aria-atomic': bool,
  'aria-live': oneOf(['off', 'polite', 'assertive']),
  'aria-relevant': _validateAriaRelevant,
  role: _ensureNoRole
};

export const Alert = props => (
  <div aria-relevant="additions text" {...props} aria-atomic={true} aria-live="assertive" role="alert" />
);

Alert.propTypes = {
  'aria-atomic': _ensureUndefined,
  'aria-live': _ensureUndefined,
  'aria-relevant': _validateAriaRelevant,
  role: _ensureUndefined
};

export const Status = props => (
  <div aria-relevant="additions text" {...props} aria-atomic={true} aria-live="polite" role="status" />
);

Status.propTypes = {
  'aria-atomic': _ensureUndefined,
  'aria-live': _ensureUndefined,
  'aria-relevant': _validateAriaRelevant,
  role: _ensureUndefined
};
export const Log = props => <div aria-atomic={false} aria-relevant="additions" {...props} aria-live="polite" role="log" />;

Log.propTypes = {
  'aria-atomic': bool,
  'aria-live': _ensureUndefined,
  'aria-relevant': _validateAriaRelevant,
  role: _ensureUndefined
};

export const Progressbar = props => <div {...props} aria-valuemin={0} aria-valuemax={1} role="progressbar" />;

const _validateAriaValueNow = (props, propName, componentName) => {
  const avn = props[propName];
  if (avn > 1 || avn < 0) {
    return new Error(zeroToOne(avn, propName, componentName));
  }
};

Progressbar.propTypes = {
  'aria-valuemax': _ensureUndefined,
  'aria-valuemin': _ensureUndefined,
  'aria-valuenow': _validateAriaValueNow,
  role: _ensureUndefined
};

export const Marquee = props => (
  <div aria-atomic={false} aria-relevant="additions text" {...props} aria-live={'off'} role="marquee" />
);

Marquee.propTypes = {
  'aria-atomic': bool,
  'aria-live': _ensureUndefined,
  'aria-relevant': _validateAriaRelevant,
  role: _ensureUndefined
};

export const Timer = props => (
  <div aria-atomic={false} aria-relevant="additions text" {...props} aria-live={'off'} role="timer" />
);

Timer.propTypes = {
  'aria-atomic': bool,
  'aria-live': _ensureUndefined,
  'aria-relevant': _validateAriaRelevant,
  role: _ensureUndefined
};
