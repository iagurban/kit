/**
 * Converts an unknown error value into a string representation.
 *
 * If the provided error is an instance of the `Error` object, its `message` property
 * is returned. Otherwise, the error is coerced to a string using the `String` function.
 *
 * @param {unknown} error - The value representing the error to be converted into a string format.
 * @returns {string} A string representation of the provided error.
 */
export const errorToString = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

/**
 * A utility function that converts an unknown value into an instance of the Error type.
 *
 * If the provided parameter is an instance of the Error object, it will return the parameter as is.
 * Otherwise, it converts the unknown value to a string and creates a new Error instance with the string as its message.
 *
 * This is useful for ensuring that error handling logic always works with Error objects.
 *
 * @param {unknown} e - The value to be converted into an Error object.
 * @returns {Error} The resulting Error object.
 */
export const errorFromUnknown = (e: unknown): Error => (e instanceof Error ? e : new Error(String(e)));
