import { z } from 'zod/v4';

import type { JsonValue } from '../core';

/**
 * A Zod schema for validating JSON literal values.
 * A JSON literal can be a string, number, boolean, or null.
 */
export const jsonLiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

/**
 * Represents a Zod schema for validating JSON values, supporting recursive structures.
 * A JSON value can be a literal (string, number, boolean, or null), an array of JSON values,
 * or an object with string keys and JSON value entries.
 *
 * This schema employs a lazy evaluation to allow for recursive structures, enabling validation
 * of nested arrays or objects that reference the schema itself.
 *
 * The structure captures all possible valid JSON types as per the JSON standard:
 * - Literals: string, number, boolean, null
 * - Arrays of JSON values
 * - Objects with string keys and JSON value properties
 *
 * Compatible with environments requiring the two-argument version of `z.record`.
 */
export const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    jsonLiteralSchema,
    z.array(jsonValueSchema),
    // Use the two-argument version of z.record() as required by your environment.
    // Keys are strings, values can be any valid JsonValue.
    z.record(z.string(), jsonValueSchema),
  ])
);

/**
 * A Zod schema for validating JSON objects.
 * A JSON object is a record with string keys and JSON values.
 */
export const jsonObjectSchema = z.record(z.string(), jsonValueSchema);
