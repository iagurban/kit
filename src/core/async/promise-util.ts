/**
 * Determines if the given object is Promise.
 *
 * This function checks if the provided object is not null or undefined
 * and possesses a `then` property, which is characteristic of Promise objects.
 * It uses type narrowing to assert the object as a Promise of a given type.
 *
 * @template T - The type of the value that the Promise resolves to.
 * @param {unknown} o - The object to be checked.
 * @returns {o is Promise<T>} Returns `true` if the object is a Promise, otherwise `false`.
 */
export const isPromise = <T>(o: unknown): o is Promise<T> => {
  return o != null && (o as { then?: unknown }).then != null;
};

/**
 * A utility type that extracts the resolved value type of Promise.
 * If the provided type `T` is a Promise, `PromiseValue<T>` resolves to the type of the value that the Promise resolves/rejects with.
 * Otherwise, it resolves to the original type `T`.
 *
 * @template T - The type to evaluate.
 */
export type PromiseValue<T> = T extends Promise<infer R> ? R : T;

/**
 * Represents a type that transforms the values of an object type `T` into their resolved promise values.
 *
 * Each property in the resulting type corresponds to the properties of the input object `T`,
 * with the values being replaced by the resolved types of any promises they may hold.
 *
 * This utility is useful when you are working with a record where each value is wrapped in a `Promise`,
 * allowing you to define a type for the resolved values of those promises.
 *
 * @template T - The original object type whose values are promises or other types.
 */
export type PromisesRecordValue<T> = { [K in keyof T]: PromiseValue<T[K]> };

/**
 * Asynchronously resolves all promise values within an object while preserving the structure of the object.
 *
 * The function iterates over all key-value pairs in the provided object. If a value is a Promise, it waits until the promise
 * resolves and sets the resolved value in the corresponding key. If a value is not a Promise, it is directly added to
 * the resulting object. The function ensures that all promises are resolved concurrently, and the resolved object retains
 * the same keys as the input with resolved values.
 *
 * @template T - The type of the input object with possible promise values.
 * @param {T} o - An object that may contain values or promises to be resolved.
 * @returns {Promise<PromisesRecordValue<T>>} A promise that resolves to an object of the same shape as the input object
 * with all promises replaced by their resolved values.
 */
export const resolveRecord = async <T extends Record<string, unknown>>(
  o: T
): Promise<PromisesRecordValue<T>> => {
  const r: Record<string, unknown> = {};
  const promises: Promise<unknown>[] = [];
  for (const [k, v] of Object.entries(o)) {
    if (isPromise(v)) {
      promises.push(v.then(v => void (r[k] = v)));
    } else {
      r[k] = v;
    }
  }
  if (promises.length) {
    await Promise.all(promises);
  }
  return r as PromisesRecordValue<T>;
};
