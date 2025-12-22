import { objectOwnKeysIterable } from '../collections/object-utils';
import { composer, composerArgv } from '../composer';
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

  const isValidEntry = (() => {
    const fn = composerArgv<[count: number, key: string, value: unknown]>(() => true);

    maxKeys != null && fn.push(count => count <= maxKeys);
    keyChecker != null && fn.push((_, key) => keyChecker(key));
    valueChecker != null && fn.push((_, __, value) => valueChecker(value));

    return fn.run;
  })();

  const isValidRecord = (() => {
    const fn = composer((o: Record<string, unknown>) => {
      let count = 0;
      for (const k of objectOwnKeysIterable(o)) {
        count++;
        if (!isValidEntry(count, k, o[k])) {
          return false;
        }
      }

      return minKeys == null || count >= minKeys;
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
