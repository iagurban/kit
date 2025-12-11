import { composer } from '../composer';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type DateOptions = CheckOptions<Date> & {
  min?: Date | number | string;
  max?: Date | number | string;
  allowInvalid?: boolean;
};

/**
 * Checks if a value is a valid Date object matching optional constraints.
 * Implicitly ensures the date is valid (not NaN).
 */
export const isDateOf = (options: DateOptions = {}): Checker<Date> => {
  const isDateValid = (() => {
    const fn = composer(options.allowInvalid ? (_: number) => true : (t: number) => !Number.isNaN(t));

    if (options.min != null) {
      const min = new Date(options.min).getTime();
      fn.push(t => t >= min);
    }
    if (options.max != null) {
      const max = new Date(options.max).getTime();
      fn.push(t => t <= max);
    }

    return fn.run;
  })();

  const custom = options.check;

  return tagCheckerGetter(
    (o): o is Date =>
      // 1. Instance check
      o instanceof Date &&
      // 2. Time & Validity checks (Validates !NaN and Ranges)
      isDateValid(o.getTime()) &&
      // 3. Custom check
      (!custom || custom(o)),
    () =>
      buildDesc('date', [
        !options.allowInvalid && 'valid',
        options.allowInvalid && 'allowInvalid',
        options.min != null && `>=${new Date(options.min).toISOString()}`,
        options.max != null && `<=${new Date(options.max).toISOString()}`,
        options.check && (options.checkName ?? 'custom'),
      ])
  );
};
