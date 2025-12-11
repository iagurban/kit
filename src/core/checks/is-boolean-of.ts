import { composer } from '../composer';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type BooleanOptions<T extends boolean = boolean> = CheckOptions<T> & {
  value?: T;
};

/**
 * Creates a checker that validates boolean values with optional constraints.
 *
 * Supports fixing to an exact value and a custom predicate. The resulting checker
 * exposes a descriptive `type` label.
 *
 * @template T The boolean subtype to validate.
 * @param {BooleanOptions<T>} [options={}] Optional validation options.
 * @returns {Checker<T>} A checker for boolean values.
 */
export const isBooleanOf = <T extends boolean = boolean>(options: BooleanOptions<T> = {}): Checker<T> => {
  const isBooleanValid = (() => {
    const fn = composer((_: boolean) => true);

    const { value, check } = options;

    value !== undefined && fn.push(v => v === value);
    check != null && fn.push(v => check(v as T));

    return fn.run;
  })();

  return tagCheckerGetter(
    (o): o is T => typeof o === 'boolean' && isBooleanValid(o),
    () =>
      buildDesc('boolean', [
        options.value !== undefined && `is:${options.value}`,
        options.check && (options.checkName ?? 'custom'),
      ])
  );
};
