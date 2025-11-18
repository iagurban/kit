import type { JsonScalar } from './json-type';

export type ReadonlyJsonArray = readonly ReadonlyJsonValue[];
export type ReadonlyJsonObject = { readonly [key: string]: ReadonlyJsonValue };
export type ReadonlyJsonValue = JsonScalar | ReadonlyJsonArray | ReadonlyJsonObject;
