import { composer } from '../composer';
import { isNumber } from './is-number';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type NumberOptions = CheckOptions<number> & {
  min?: number;
  max?: number;
  exclusiveMin?: boolean;
  exclusiveMax?: boolean;
  integer?: boolean;
  finite?: boolean;
  safe?: boolean;
};

/**
 * Creates a checker that validates `number` values with optional constraints.
 *
 * Supports min/max (inclusive or exclusive), `integer`, `finite`, `safe` (safe integer),
 * and a custom predicate. The resulting checker provides a descriptive `type` label.
 *
 * @param {NumberOptions} [options={}] Optional validation options.
 * @returns {Checker<number>} A checker for numbers.
 */
export const isNumberOf = (options: NumberOptions = {}): Checker<number> => {
  const isNumberValid = (() => {
    const fn = composer((_: number) => true);

    options.finite && fn.push(Number.isFinite);
    options.integer && fn.push(Number.isInteger);
    options.safe && fn.push(Number.isSafeInteger);

    const { min, max } = options;
    min != null && fn.push(options.exclusiveMin ? v => v > min : v => v >= min);
    max != null && fn.push(options.exclusiveMax ? v => v < max : v => v <= max);

    options.check != null && fn.push(options.check);

    return fn.run;
  })();

  return tagCheckerGetter(
    (o): o is number => isNumber(o) && isNumberValid(o),
    () =>
      buildDesc('number', [
        options.integer && 'int',
        options.min != null && `${options.exclusiveMin ? '>' : '>='}${options.min}`,
        options.max != null && `${options.exclusiveMax ? '<' : '<='}${options.max}`,
        options.finite && 'finite',
        options.safe && 'safe',
        options.check && (options.checkName ?? 'custom'),
      ])
  );
};
