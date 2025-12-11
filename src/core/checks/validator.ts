import type { Checker } from './util';

/**
 * A higher-order function that validates an input against a specified checker function
 * and applies a transformation function if the validation is successful.
 *
 * @template K - The type to validate the input against.
 * @template R - The return type of the transformation function.
 * @param {Checker<K>} isK - A function used to verify if the input matches the specified type or criteria. The `isK.type` property is used to describe the type in error messages.
 * @returns {(o: unknown, fn: (o: K) => R) => R} A function that takes an input value to validate and a transformation function to apply if the input is valid.
 *
 * @throws {Error} Throws an error if the input validation fails, including the expected type (if available) and the actual input value.
 */
export const validator =
  <K>(isK: Checker<K>): (<R>(o: unknown, fn: (o: K) => R) => R) =>
  <R>(o: unknown, fn: (o: K) => R) => {
    if (!isK(o)) {
      throw new Error(`check ${isK.type == null ? '' : `of type ${isK.type} `}failed, got ${o}`);
    }
    return fn(o);
  };

/**
 * A higher-order function that creates a validator for performing runtime type checks on an input.
 * The validator applies the provided type checker and throws an error if the type check fails.
 *
 * @template K The type to be checked.
 * @param {Checker<K>} isK A type checker function that determines whether the input matches the expected type.
 * @returns {(o: unknown) => K} A validation function that validates the input and either returns the validated value or throws an error.
 * @throws {Error} If the input does not pass the provided type check.
 */
export const validator0 =
  <K>(isK: Checker<K>): ((o: unknown) => K) =>
  o => {
    if (!isK(o)) {
      throw new Error(`check ${isK.type == null ? '' : `of type ${isK.type} `}failed, got ${o}`);
    }
    return o;
  };
