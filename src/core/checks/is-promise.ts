import { isPromiseInstance } from './is-promise-instance';
import { canHaveProperties, tagChecker } from './util';

export const isPromise = tagChecker(
  (value: unknown): value is Promise<unknown> =>
    // Fast Path
    isPromiseInstance(value) ||
    // Slow Path
    (canHaveProperties(value) &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function' &&
      typeof value.finally === 'function'),
  `promise`
);
