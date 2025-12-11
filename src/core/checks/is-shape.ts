import { objectOwnKeysIterable } from '../collections/object-utils';
import { composer } from '../composer';
import { isSomeObject } from './is-some-object';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type ShapeOptions<T> = CheckOptions<T> & {
  /** If true, the object must not contain any keys other than those defined in the shape. */
  exact?: boolean;
};

export const isShape = <T extends Record<string, unknown>>(
  shape: { [K in keyof T]: Checker<T[K]> },
  options: ShapeOptions<T> = {}
): Checker<T> => {
  const runShapeCheck = (() => {
    // 1. Compile Property Checks (Loop Unrolling)
    const fn = composer((_: Record<string, unknown>) => true);

    for (const key of objectOwnKeysIterable(shape)) {
      const checker = shape[key];
      // We capture 'key' and 'checker' in the closure
      fn.push(o => checker(o[key]));
    }

    // 2. Compile "Exact" Check (Cold Path setup, Hot Path execution)
    if (options.exact) {
      const allowedKeys = new Set(Object.keys(shape)); // O(1) lookup
      fn.push(o => {
        for (const key of objectOwnKeysIterable(o)) {
          if (!allowedKeys.has(key)) {
            return false;
          }
        }
        return true;
      });
    }

    // 3. Compile Custom Check
    const { check } = options;
    check && fn.push(check as (o: Record<string, unknown>) => boolean);

    return fn.run;
  })();

  return tagCheckerGetter(
    (o): o is T => isSomeObject(o) && runShapeCheck(o),
    () => {
      // Build Description
      // Truncate to avoid massive error messages for large objects
      const keys = Object.keys(shape);
      const fmtKeys = keys.length > 5 ? `{${keys.slice(0, 5).join(', ')}, ...}` : `{${keys.join(', ')}}`;
      return buildDesc(fmtKeys, [options.exact && 'exact', options.check && (options.checkName ?? 'custom')]);
    }
  );
};
