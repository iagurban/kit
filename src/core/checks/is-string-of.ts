import { composer } from '../composer';
import { isString } from './is-string';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type StringOptions<T extends string = string> = CheckOptions<T> & {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  values?: readonly T[];
};

/**
 * Creates a checker that validates strings with optional constraints.
 *
 * Supports minimum/maximum length, regex pattern, an enum of allowed values,
 * and a custom predicate. The resulting checker exposes a descriptive `type` label.
 *
 * @template T The string subtype (union) to validate.
 * @param {StringOptions<T>} [options={}] Optional validation options.
 * @returns {Checker<T>} A checker for strings.
 */
export const isStringOf = <T extends string = string>(options: StringOptions<T> = {}): Checker<T> => {
  const run = (() => {
    const fn = composer((_: string) => true);

    const { minLength, maxLength, pattern, values, check } = options;

    minLength != null && fn.push(v => v.length >= minLength);
    maxLength != null && fn.push(v => v.length <= maxLength);
    pattern != null && fn.push(v => pattern.test(v));

    if (values != null) {
      const allowed = new Set(values);
      fn.push(v => allowed.has(v as T));
    }

    check != null && fn.push(v => check(v as T));

    return fn.run;
  })();

  return tagCheckerGetter(
    (o): o is T => isString(o) && run(o),
    () =>
      buildDesc('string', [
        options.minLength != null && `len>=${options.minLength}`,
        options.maxLength != null && `len<=${options.maxLength}`,
        options.pattern && `matches:${options.pattern}`,
        options.values && `enum`,
        options.check && (options.checkName ?? 'custom'),
      ])
  );
};
