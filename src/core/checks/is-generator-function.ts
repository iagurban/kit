import { canHaveProperties, tagChecker } from './util';

/**
 * Checker that determines whether a value is a generator function (function*).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a generator function, otherwise false.
 */
export const isGeneratorFunction = tagChecker(
  (value: unknown): value is GeneratorFunction =>
    canHaveProperties(value) && value[Symbol.toStringTag] === 'GeneratorFunction',
  `generatorFunction`
);
