import { useEffect } from 'react';

const logAndThrow = message => {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (_) {}
};

const useLogError = (condition = false, message) =>
  useEffect(() => {
    if (condition) {
      logAndThrow(message);
    }
  }, [condition, message]);

export default useLogError;
