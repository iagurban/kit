import { tagChecker } from './util';

/**
 * Checks if the provided value is a VALID number (typeof number AND not NaN).
 * strictly safer than standard typeof check.
 */
export const isNumber = tagChecker(
  (o: unknown): o is number => typeof o === 'number' && !Number.isNaN(o),
  `number`
);
