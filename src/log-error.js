import { useEffect } from 'react';

const logAndThrow = message => {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (_) {}
};

const logError = (condition = false, message) =>
  useEffect(() => {
    if (condition) {
      logAndThrow(message);
    }
  }, []);
export default logError;
