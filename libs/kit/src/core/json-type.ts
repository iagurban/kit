import { z } from 'zod/v4';

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export type JsonScalar = z.infer<typeof literalSchema>;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export type JsonValue = JsonScalar | JsonObject | JsonArray;

export const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    literalSchema,
    z.array(jsonValueSchema),
    // Use the two-argument version of z.record() as required by your environment.
    // Keys are strings, values can be any valid JsonValue.
    z.record(z.string(), jsonValueSchema),
  ])
);

export const jsonObjectSchema = z.record(z.string(), jsonValueSchema);

export type ExtendedJsonScalar = string | number | boolean | null | undefined | bigint | Date;
export type ExtendedJsonArray = ExtendedJsonValue[];
export type ExtendedJsonObject = { [key: string]: ExtendedJsonValue };
export type ExtendedJsonValue = ExtendedJsonScalar | ExtendedJsonArray | ExtendedJsonObject;

export type ReadonlyExtendedJsonArray = readonly ReadonlyExtendedJsonValue[];
export type ReadonlyExtendedJsonObject = Readonly<{ [key: string]: ReadonlyExtendedJsonValue }>;
export type ReadonlyExtendedJsonValue =
  | ExtendedJsonScalar
  | ReadonlyExtendedJsonArray
  | ReadonlyExtendedJsonObject;

export type ReadonlyJsonArray = readonly ReadonlyJsonValue[];
export type ReadonlyJsonObject = { readonly [key: string]: ReadonlyJsonValue };
export type ReadonlyJsonValue = JsonScalar | ReadonlyJsonArray | ReadonlyJsonObject;
