/* istanbul ignore file */

import { ProgrammingError } from '../errors/programming-error';

type AnyBooleash = unknown;

export const debugAssert = (condition: AnyBooleash, getMessage?: () => string) => {
  if (!condition) {
    throw new ProgrammingError(getMessage?.());
  }
};

export const debugAssertFn = (getCondition: () => AnyBooleash, getMessage?: () => string) =>
  debugAssert(getCondition(), getMessage);
