import { objectOwnKeysIterable } from '../collections/object-utils';
import { composer } from '../composer';
import { isSomeObject } from './is-some-object';
import { buildDesc, Checker, CheckOptions, tagCheckerGetter } from './util';

export type ShapeOptions<T> = CheckOptions<T> & {
  /** If true, the object must not contain any keys other than those defined in the shape. */
  exact?: boolean;
};

/**
 * Creates a checker that validates an object matches a given shape.
 *
 * Each key in the `shape` is validated by its corresponding checker. When `exact`
 * is true, no extra keys are allowed. You can also provide a custom predicate.
 * The resulting checker exposes a descriptive `type` label with the listed keys
 * (truncated for large shapes) and constraints.
 *
 * @template T The target object type.
 * @param {{ [K in keyof T]: Checker<T[K]> }} shape - Checkers for each expected property.
 * @param {ShapeOptions<T>} [options] Optional validation options.
 * @returns {Checker<T>} A checker for objects of shape `T`.
 */
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
