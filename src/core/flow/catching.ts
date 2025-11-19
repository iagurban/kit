export function catching<T, C>(fn: () => T, onCatch: (error: unknown) => C): T | C;
export function catching<T>(fn: () => T, onCatch: (error: unknown) => T): T;

/**
 * Executes a function and provides a mechanism to handle errors by executing a provided error-handling function.
 *
 * @param {Function} fn - The function to execute, which may throw an error.
 * @param {Function} onCatch - The error-handling function to execute if an error is thrown. Receives the error as its argument.
 * @return {T | C} The result of the executed function if no error occurs, or the result of the error-handling function if an error is caught.
 */
export function catching<T, C>(fn: () => T, onCatch: (error: unknown) => C): T | C {
  try {
    return fn();
  } catch (error) {
    return onCatch(error);
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
