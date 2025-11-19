import type { z, ZodType } from 'zod/v4';

/**
 * Determines if a given input conforms to the specified Zod schema.
 *
 * @template T - The type of the Zod schema.
 * @param {T} schema - The Zod schema to validate the input against.
 * @param {unknown} o - The input to check.
 * @returns {o is z.input<T>} True if the input matches the schema's expected input type, otherwise false.
 */
export const isZodInput = <T extends ZodType>(schema: T, o: unknown): o is z.input<T> =>
  schema.safeEncode(o as z.output<T>).success;

/**
 * Checks if the provided value matches the expected output type of the given Zod schema.
 *
 * @template T - The Zod schema type.
 * @param {T} schema - The Zod schema to validate against.
 * @param {unknown} o - The value to validate.
 * @returns {boolean} True if the value matches the schema's output type, otherwise false.
 */
export const isZodOutput = <T extends ZodType>(schema: T, o: unknown): o is z.output<T> =>
  schema.safeDecode(o as z.input<T>).success;
