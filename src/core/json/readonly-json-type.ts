import type { JsonScalar } from './json-type';

export type ReadonlyJsonArray = readonly ReadonlyJsonValue[];
export type ReadonlyJsonObject = { readonly [key: string]: ReadonlyJsonValue };
/**
 * Represents a read-only JSON value, which can be a scalar value,
 * a read-only array, or a read-only object.
 *
 * This type is intended to ensure that JSON-like data structures
 * are treated as immutable, preventing modification of their contents.
 *
 * Components:
 * - `JsonScalar`: Represents primitive JSON values (string, number, boolean, or null).
 * - `ReadonlyJsonArray`: An array where elements are also `ReadonlyJsonValue`.
 * - `ReadonlyJsonObject`: An object where values are `ReadonlyJsonValue`.
 */
export type ReadonlyJsonValue = JsonScalar | ReadonlyJsonArray | ReadonlyJsonObject;
