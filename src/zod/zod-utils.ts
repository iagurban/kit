import { z } from 'zod/v4-mini';

/**
 * In Zod:
 *
 * input = encoded = JSON
 * output = decoded = JS
 *
 * input (string) -> decode -> output (Date)
 *
 */

/**
 * Determines if a given value is "decodeable" input-value of the given Zod schema.
 *
 * @template T - The type of the Zod schema.
 * @param {T} schema - The Zod schema to validate against.
 * @param {unknown} o - The input to check.
 * @returns {o is z.input<T>} True if the input matches the schema's expected input type, otherwise false.
 */
export const isZodInput = <T extends z.ZodMiniType>(schema: T, o: unknown): o is z.input<T> =>
  z.safeDecode(schema, o as z.input<T>).success;

/**
 * Determines if a given value is "encodeable" output-value of the given Zod schema.
 *
 * @template T - The Zod schema type.
 * @param {T} schema - The Zod schema to validate against.
 * @param {unknown} o - The value to validate.
 * @returns {boolean} True if the value matches the schema's output type, otherwise false.
 */
export const isZodOutput = <T extends z.ZodMiniType>(schema: T, o: unknown): o is z.output<T> =>
  z.safeEncode(schema, o as z.output<T>).success;
