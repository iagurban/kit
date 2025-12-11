import { objectOwnKeysIterable } from '../collections/object-utils';
import { composer } from '../composer';
import { isSomeObject } from './is-some-object';
import { buildDesc, Checker, checkerType, CheckOptions, tagCheckerGetter } from './util';

export type RecordOptions<V> = CheckOptions<Record<string, V>> & {
  /** Optional checker to validate the format of the keys (e.g., UUIDs, specific prefixes) */
  key?: Checker<string>;
  /** Optional checker to validate the values. If omitted, values are treated as unknown. */
  value?: Checker<V>;
  minKeys?: number;
  maxKeys?: number;
};

/**
 * Creates a checker that validates plain object records with optional constraints.
 *
 * Validates string keys and associated values using provided checkers, supports
 * minimum/maximum number of keys, and allows a custom predicate. The type label
 * reflects the key/value checkers and constraints.
 *
 * @template V The value type of the record.
 * @param {RecordOptions<V>} [options={}] Optional validation options.
 * @returns {Checker<Record<string, V>>} A checker for string-keyed records of `V`.
 */
export const isRecordOf = <V = unknown>(options: RecordOptions<V> = {}): Checker<Record<string, V>> => {
  const { key: keyChecker, value: valueChecker, minKeys, maxKeys, check, checkName } = options;

  const isValidRecord = (() => {
    const fn = composer((o: Record<string, unknown>) => {
      let count = 0;

      for (const k of objectOwnKeysIterable(o)) {
        count++;

        if (
          // Validate Count
          (maxKeys != null && count > maxKeys) ||
          // Validate Key
          (keyChecker && !keyChecker(k)) ||
          // Validate Value
          (valueChecker && !valueChecker((o as Record<string, unknown>)[k]))
        ) {
          return false;
        }
      }

      // Check Min Keys (after counting)
      return !(minKeys != null && count < minKeys);
    });

    check && fn.push(check as (o: Record<string, unknown>) => boolean);

    return fn.run;
  })();

  return tagCheckerGetter(
    (o): o is Record<string, V> => isSomeObject(o) && isValidRecord(o),
    () =>
      buildDesc(
        `Record<${keyChecker ? checkerType(keyChecker) : 'string'}, ${
          valueChecker ? checkerType(valueChecker) : 'unknown'
        }>`,
        [
          minKeys != null && `minKeys>=${minKeys}`,
          maxKeys != null && `maxKeys<=${maxKeys}`,
          check && (checkName ?? 'custom'),
        ]
      )
  );
};
