import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is an `IteratorResult`.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value has a `value` field and boolean `done`, otherwise false.
 */
export const isIteratorResult = tagChecker(
  (value: unknown): value is IteratorResult<unknown> =>
    canHaveProperties(value) && 'value' in value && typeof value.done === 'boolean',
  `iteratorResult`
);
