/**
 * Evaluates a value against a given check function and throws an error if the check fails.
 *
 * @param {T} v - The value to be validated.
 * @param {(v: T) => v is R} check - A function that performs a validation check on the value. Should return a truthy value if validation passes.
 * @param {(v: T) => string | Error} message - A function that generates an error message or error object to be thrown if validation fails.
 * @return {R} Returns the validated value if the check is successful.
 * @throws {Error} Throws an error if the check function returns a falsy value.
 */
export function checked<T, R extends T>(v: T, check: (v: T) => v is R, message: (v: T) => string | Error): R;
/**
 * Evaluates a value against a given check function and throws an error if the check fails.
 *
 * @param {T} v - The value to be validated.
 * @param {(v: T) => unknown} check - A function that performs a validation check on the value. Should return a truthy value if validation passes.
 * @param {(v: T) => string | Error} message - A function that generates an error message or error object to be thrown if validation fails.
 * @return {T} Returns the validated value if the check is successful.
 * @throws {Error} Throws an error if the check function returns a falsy value.
 */
export function checked<T>(v: T, check: (v: T) => unknown, message: (v: T) => string | Error): T;
/**
 * Evaluates a value against a given check function and throws an error if the check fails.
 *
 * @param {T} v - The value to be validated.
 * @param {(v: T) => unknown} check - A function that performs a validation check on the value. Should return a truthy value if validation passes.
 * @param {(v: T) => string | Error} message - A function that generates an error message or error object to be thrown if validation fails.
 * @return {R} Returns the validated value if the check is successful.
 * @throws {Error} Throws an error if the check function returns a falsy value.
 */
export function checked<T, R extends T>(
  v: T,
  check: (v: T) => unknown,
  message: (v: T) => string | Error
): R {
  if (!check(v)) {
    const e = message(v);
    throw typeof e === `string` ? new Error(e) : e;
  }
  return v as R;
}
