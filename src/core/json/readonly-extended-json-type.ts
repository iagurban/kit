import type { ExtendedJsonScalar } from './extended-json-type';

export type ReadonlyExtendedJsonArray = readonly ReadonlyExtendedJsonValue[];
export type ReadonlyExtendedJsonObject = Readonly<{ [key: string]: ReadonlyExtendedJsonValue }>;
export type ReadonlyExtendedJsonValue =
  | ExtendedJsonScalar
  | ReadonlyExtendedJsonArray
  | ReadonlyExtendedJsonObject;
