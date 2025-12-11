/**
 * Maps an array of objects to an object where keys are derived from a specified property or computation.
 *
 * @template T The type of elements in the input array.
 * @template K The type of the keys, which extends string, number, or symbol.
 * @param {readonly T[]} o The input array to be mapped.
 * @param {(t: T) => K} by A function that determines the key for each element in the array.
 * @returns {Record<K, T>} An object where each key corresponds to the result of the `by` function applied to an element in the array, and the value is the corresponding element.
 */
export const mappedBy = <T, K extends string | number | symbol>(
  o: readonly T[],
  by: (t: T) => K
): Record<K, T> => {
  const r: Partial<Record<K, T>> = {};
  for (const t of o) {
    r[by(t)] = t;
  }
  return r as Record<K, T>;
};

/**
 * Groups the elements of an array based on the result of a callback function.
 *
 * @template T The type of the elements in the input array.
 * @template K The type of the keys returned by the callback function.
 * @param {readonly T[]} o The input array to be grouped.
 * @param {(t: T) => K} by A callback function that takes an element of the array and returns a key
 * to group by.
 * @returns {Record<K, T[]>} An object where the keys are the results of the callback function, and
 * the values are arrays of elements from the input array that correspond to each key.
 */
export const groupedBy = <T, K extends string | number | symbol>(
  o: readonly T[],
  by: (t: T) => K
): Record<K, T[]> => {
  const r: Partial<Record<K, T[]>> = {};
  for (const t of o) {
    (r[by(t)] ??= []).push(t);
  }
  return r as Record<K, T[]>;
};

/**
 * Transforms the entries of an object by applying a mapping function to its values and keys.
 *
 * @template K - The type of the keys in the input object. Must extend `string`.
 * @template V - The type of the values in the input object.
 * @template R - The type of the input object. Must be a record where the key is of type `K` and the value is of type `V`.
 * @template D - The type of the values in the output object.
 * @param {R} o - The input object whose entries will be transformed.
 * @param {(v: V, k: K) => D} fn - A function that takes a value of type `V` and a key of type `K`, and returns a transformed value of type `D`.
 * @returns {Record<K, D>} A new object with the same keys as the input object, but with transformed values of type `D`.
 */
export const mapEntries = <K extends string, R extends Record<K, unknown>, D>(
  o: R,
  fn: (v: R[keyof R], k: keyof R) => D
): Record<K, D> => {
  const r: Partial<Record<keyof R, D>> = {};
  for (const k in o) {
    // noinspection JSUnfilteredForInLoop
    r[k as keyof R] = fn(o[k], k as unknown as K);
  }
  return r as Record<K, D>;
};

/**
 * Iterates over the own enumerable string-keyed properties of an object and
 * applies a transformation function to each key-value pair, returning a new
 * object with the transformed values.
 *
 * @template R An object with string keys and values of any type.
 * @template D The type of the resulting transformed values.
 * @param {R} o The object whose own enumerable properties are to be iterated over.
 * @param {(v: R[keyof R], k: keyof R) => D} fn The function to apply to each property.
 * The function receives the value and key of each property as arguments.
 * @returns {Record<keyof R, D>} A new object with the same keys as the input
 * object, but transformed values based on the provided function.
 */
export const mapOwnEntries = <K extends string, R extends Record<K, unknown>, D>(
  o: R,
  fn: (v: R[keyof R], k: keyof R) => D
): Record<K, D> => {
  const r: Partial<Record<keyof R, D>> = {};
  for (const k in o) {
    if (!Object.prototype.hasOwnProperty.call(o, k)) {
      continue;
    }
    r[k as keyof R] = fn(o[k], k as unknown as K);
  }
  return r as Record<K, D>;
};

/**
 * Converts an array of key-value pairs into an object.
 *
 * @template T - The type of the keys in the resulting object. Must extend string, number, or symbol.
 * @template V - The type of the values in the resulting object.
 * @param {readonly (readonly [T, V])[]} pairs - An array of key-value pairs where each element is a tuple containing a key and a value.
 * @returns {Record<T, V>} An object constructed from the provided key-value pairs.
 */
export const fromEntries = <T extends string | number | symbol, V>(
  pairs: readonly (readonly [T, V])[]
): Record<T, V> => Object.fromEntries(pairs) as Record<T, V>;

/**
 * Checks whether the given object is empty (i.e., contains no own enumerable properties).
 *
 * @param {object} o - The object to be checked.
 * @returns {boolean} Returns `true` if the object is empty, otherwise `false`.
 */
export const isObjectEmpty = (o: object): boolean => {
  for (const k in o) {
    if (Object.prototype.hasOwnProperty.call(o, k)) {
      return false;
    }
  }
  return true;
};

/**
 * Returns a lazy iterable for the object's own enumerable string properties.
 * * @param obj - The object to iterate over. Can be null or undefined (safe no-op).
 * @returns An iterator that yields property keys as strings.
 */
export function* objectOwnKeysIterable(obj: object | null | undefined): IterableIterator<string> {
  // 1. Safety check handles null/undefined
  if (obj == null) {
    return;
  }

  // 2. Iterate using for...in (lazy)
  for (const key in obj) {
    // 3. Filter for own properties
    // Note: Object.hasOwn requires "lib": ["ES2022"] in tsconfig.json
    if (Object.hasOwn(obj, key)) {
      yield key;
    }
  }
}
