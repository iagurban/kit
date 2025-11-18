import type { ExtendedJsonScalar } from './extended-json-type';

export type ReadonlyExtendedJsonArray = readonly ReadonlyExtendedJsonValue[];
export type ReadonlyExtendedJsonObject = Readonly<{ [key: string]: ReadonlyExtendedJsonValue }>;
/**
 * Represents an extended JSON value that is immutable. This can be any of the following types:
 * - An `ExtendedJsonScalar`, which includes scalar values like strings, numbers, or booleans.
 * - A `ReadonlyExtendedJsonArray`, which is an immutable array of extended JSON values.
 * - A `ReadonlyExtendedJsonObject`, which is an immutable object with values that are extended JSON values.
 */
export type ReadonlyExtendedJsonValue =
  | ExtendedJsonScalar
  | ReadonlyExtendedJsonArray
  | ReadonlyExtendedJsonObject;
