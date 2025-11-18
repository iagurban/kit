export type JsonScalar = string | number | boolean | null | undefined;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
/**
 * Represents a JSON value that can either be a scalar, an object, or an array.
 *
 * JsonValue is a TypeScript type union combining the following:
 * - JsonScalar: Represents primitive JSON values such as strings, numbers, booleans, or null.
 * - JsonObject: Represents a JSON object, which is a collection of key-value pairs where keys are strings and values are other JSON values.
 * - JsonArray: Represents a JSON array, which is an ordered list of JSON values.
 */
export type JsonValue = JsonScalar | JsonObject | JsonArray;
