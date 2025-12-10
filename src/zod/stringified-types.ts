import { z } from 'zod/v4-mini';

/**
 * A codec for handling the conversion between a stringified representation of
 * a bigint and its actual bigint value. This ensures strict validation and
 * transformation between the two forms.
 *
 * The codec encodes a bigint value into its string representation and decodes
 * a stringified integer back into a bigint. During decoding, it verifies that
 * the input string matches the regular expression for a valid integer
 * representation, including optional '+' or '-' prefixes.
 *
 * Validation ensures the input is:
 * - A string matching the regex /^[+-]?[0-9]+$/
 * - A valid integer string that can be safely converted to bigint
 *
 * Fields:
 * - encode: A function that converts a bigint to its string representation.
 * - decode: A function that converts a valid integer string to a bigint.
 */
export const stringifiedBigint = z.codec(
  z.string().check(z.regex(/^[+-]?[0-9]+$/, 'Must be a string representation of an integer')),
  z.bigint(),
  {
    encode: v => v.toString(),
    decode: v => BigInt(v),
  }
);

/**
 * A Zod codec that validates and transforms ISO-formatted date strings.
 *
 * This variable utilizes Zod's codec to work with ISO 8601-formatted date strings,
 * converting them into JavaScript `Date` objects and vice versa.
 *
 * Validation Rules:
 * - The input must be a valid ISO 8601 date string.
 * - The resulting Date object should represent a valid date.
 *
 * Encoding:
 * - Converts a `Date` object into an ISO 8601 string using `toISOString()`.
 *
 * Decoding:
 * - Converts an ISO 8601 string into a `Date` object.
 *
 * Refinement:
 * - Ensures that the decoded `Date` object represents a valid date.
 * - Throws an error if the date is invalid.
 *
 * Throws:
 * - An error if the given date string is not valid or cannot be parsed into a valid `Date` object.
 */
export const stringifiedISODate = z.codec(z.iso.datetime(), z.date(), {
  encode: v => v.toISOString(),
  decode: v => new Date(v),
});
