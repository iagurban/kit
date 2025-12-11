import { tagChecker } from './util';

/**
 * Checks if the provided value is a Date object.
 *
 * @param {unknown} o - The value to be checked.
 * @returns {boolean} Returns true if the input is a Date object, otherwise false.
 */
export const isDate = tagChecker(
  (o: unknown): o is Date => o instanceof Date && !Number.isNaN(o.getTime()),
  `date`
);
