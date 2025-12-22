import { composer } from '../composer';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type DateOptions = CheckOptions<Date> & {
  min?: Date | number | string;
  max?: Date | number | string;
  allowInvalid?: boolean;
};

/**
 * Creates a checker that validates `Date` values with optional constraints.
 *
 * Ensures the date is valid by default (i.e., its time is not `NaN`). You may allow
 * invalid dates by setting `allowInvalid: true`. Supports min/max bounds (accepting
 * `Date`, timestamp `number`, or ISO `string`) and a custom predicate.
 *
 * @param {DateOptions} [options={}] Optional validation options.
 * @returns {Checker<Date>} A checker for `Date` values.
 */
export const isDateOf = (options: DateOptions = {}): Checker<Date> => {
  const isTimestampValid = (() => {
    const fn = composer<number>(options.allowInvalid ? () => true : t => !Number.isNaN(t));

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

  const isDateValid = options.check;

  return tagCheckerGetter(
    (o): o is Date =>
      // 1. Instance check
      o instanceof Date &&
      // 2. Time & Validity checks (Validates !NaN and Ranges)
      isTimestampValid(o.getTime()) &&
      // 3. Custom check
      (!isDateValid || isDateValid(o)),
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
