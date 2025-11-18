import { z } from 'zod/v4';

import type { JsonValue } from '../core/json/json-type';

export const jsonLiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    jsonLiteralSchema,
    z.array(jsonValueSchema),
    // Use the two-argument version of z.record() as required by your environment.
    // Keys are strings, values can be any valid JsonValue.
    z.record(z.string(), jsonValueSchema),
  ])
);

export const jsonObjectSchema = z.record(z.string(), jsonValueSchema);
