import { composer } from '../composer';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type BigIntOptions = CheckOptions<bigint> & {
  min?: bigint | number;
  max?: bigint | number;
  fitsInNumber?: boolean;
};

/**
 * Creates a checker that validates `bigint` values with optional constraints.
 *
 * Supports min/max bounds (accepts `number` or `bigint` inputs), a `fitsInNumber`
 * constraint to limit into JS safe integer range, and a custom predicate.
 * The resulting checker exposes a descriptive `type` label.
 *
 * @param {BigIntOptions} [options={}] Optional validation options.
 * @returns {Checker<bigint>} A checker for `bigint` values.
 */
export const isBigIntOf = (options: BigIntOptions = {}): Checker<bigint> => {
  const isBigIntValid = (() => {
    const fn = composer((_: bigint) => true);

    if (options.min != null) {
      const min = BigInt(options.min);
      fn.push(v => v >= min);
    }
    if (options.max != null) {
      const max = BigInt(options.max);
      fn.push(v => v <= max);
    }
    if (options.fitsInNumber) {
      const minSafe = BigInt(Number.MIN_SAFE_INTEGER);
      const maxSafe = BigInt(Number.MAX_SAFE_INTEGER);
      fn.push(v => v >= minSafe && v <= maxSafe);
    }
    if (options.check != null) {
      const custom = options.check;
      fn.push(custom);
    }

    return fn.run;
  })();

  return tagCheckerGetter(
    (o): o is bigint => typeof o === 'bigint' && isBigIntValid(o),
    () =>
      buildDesc('bigint', [
        options.min != null && `>=${options.min}`,
        options.max != null && `<=${options.max}`,
        options.fitsInNumber && 'fitsInNumber',
        options.check && (options.checkName ?? 'custom'),
      ])
  );
};
