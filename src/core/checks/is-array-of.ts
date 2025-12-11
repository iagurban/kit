import { composer } from '../composer';
import { buildDesc, Checker, checkerType, CheckOptions, tagCheckerGetter } from './util';

export type ArrayOptions<T> = CheckOptions<T[]> & {
  minLength?: number;
  maxLength?: number;
  item?: Checker<T>;
};

export const isArrayOf = <T>(options: ArrayOptions<T> = {}): Checker<T[]> => {
  // 1. Array Level Checks (O(1))

  const isArrayValid = (() => {
    const fn = composer((_: T[]) => true);

    const { minLength, maxLength, check } = options;

    minLength != null && fn.push(v => v.length >= minLength);
    maxLength != null && fn.push(v => v.length <= maxLength);

    check != null && fn.push(check);

    return fn.run;
  })();

  const { item } = options;

  // 2. The Optimized Loop
  return tagCheckerGetter(
    (o): o is T[] => {
      // Base type + Fast checks
      if (!Array.isArray(o) || !isArrayValid(o)) {
        return false;
      }

      if (item == null) {
        return true;
      }
      // Slow check (Iteration) - only happens if needed
      for (const element of o) {
        if (!item(element)) {
          return false;
        }
      }
      return true;
    },
    () =>
      buildDesc(`${item ? checkerType(item) : `unknown`}[]`, [
        options.minLength != null && `len>=${options.minLength}`,
        options.maxLength != null && `len<=${options.maxLength}`,
        options.check && (options.checkName ?? 'custom'),
      ])
  );
};
