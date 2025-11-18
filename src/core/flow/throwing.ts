/**
 * A generic utility function that throws an exception provided by the given function.
 * Handy for throwing in ternary operators.
 *
 * @template T - The expected return type of the function, defaults to `undefined`.
 *               This is effectively the type of the value that would have been returned if the function did not throw.
 * @param {() => unknown} e - A function that produces the error or exception to be thrown.
 * @throws {unknown} The error or exception returned by the provided function `e`.
 * @returns {T} This function does not return a value as it always throws.
 */
export const throwing = <T = undefined>(e: () => unknown): T => {
  throw e();
};
