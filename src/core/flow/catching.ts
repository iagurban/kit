export function catching<T, C>(fn: () => T, onCatch: () => C): T | C;
export function catching<T>(fn: () => T, onCatch: () => T): T;

/**
 * Executes a function and, if an exception is thrown, executes a fallback function.
 *
 * @template T
 * @param {() => T} fn - The function to execute. If it runs without throwing, its result is returned.
 * @param {() => C} onCatch - The fallback function to execute if the first function throws an exception.
 * @return {T | C} Returns the result of the `fn` function if it succeeds, or the result of the `onCatch` function if an exception is caught.
 */
export function catching<T, C>(fn: () => T, onCatch: () => C): T | C {
  try {
    return fn();
  } catch {
    return onCatch();
  }
}

export function catchingAsync<T, C>(
  fn: () => Promise<T>,
  onCatch: (e: unknown) => C | Promise<C>
): Promise<T | C>;
export function catchingAsync<T>(fn: () => Promise<T>, onCatch: (e: unknown) => T | Promise<T>): Promise<T>;

/**
 * Executes an asynchronous function and provides a mechanism to handle any errors that may occur during its execution.
 *
 * @template T
 * @param {() => Promise<T>} fn - An asynchronous function that will be executed.
 * @param {(e: unknown) => C | Promise<C>} onCatch - A function that gets invoked with the caught error if `fn` throws or rejects. This function can return a value or a Promise.
 * @return {Promise<T | C>} A Promise that resolves to the result of `fn` if it succeeds, or to the outcome of `onCatch` if an error is caught.
 */
export async function catchingAsync<T, C>(
  fn: () => Promise<T>,
  onCatch: (e: unknown) => C | Promise<C>
): Promise<T | C> {
  try {
    return await fn();
  } catch (e) {
    return onCatch(e);
  }
}

/**
 * Executes a provided function and catches any thrown errors, logging them as warnings.
 *
 * @param {Function} fn - A function to be executed. It may throw an error.
 * @returns {void} This function does not return a value.
 */
export const warnCatch = (fn: () => unknown): void => {
  try {
    fn();
  } catch (error) {
    console.warn(error);
  }
};
