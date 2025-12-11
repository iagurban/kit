import { tagChecker } from './util';

/**
 * Checks if a value is a Date object, but contains an invalid time (NaN).
 * Analogous to Number.isNaN but for Dates.
 */
export const isInvalidDate = tagChecker(
  (o: unknown): o is Date => o instanceof Date && Number.isNaN(o.getTime()),
  `invalid-date`
);
