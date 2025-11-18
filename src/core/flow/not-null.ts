import { NullError } from '../errors/null-error';

/**
 * Ensures that the provided value is not null or undefined. If the value is null or undefined,
 * an error is thrown based on the specified message or error-generating function.
 *
 * @template T
 * @param {T | null | undefined} o - The value to check for null or undefined.
 * @param {string | (() => Error | string)} [message='arg is null'] - An error message string, or
 *        a function returning either a custom error or an error message string.
 * @throws {NullError} If the value is null or undefined, and a string is provided as the message.
 * @throws {Error} If the value is null or undefined and a function generating an Error is provided.
 * @returns {T} The non-null, non-undefined value.
 */
export const notNull = <T>(
  o: T | null | undefined,
  message: string | (() => Error | string) = 'arg is null'
): T => {
  if (o == null) {
    if (typeof message === 'string') {
      throw new NullError(message);
    }
    const e = message();
    if (typeof e === 'string') {
      throw new NullError(e);
    }
    throw e;
  }
  return o;
};
