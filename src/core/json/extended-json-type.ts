export type ExtendedJsonScalar = string | number | boolean | null | undefined | bigint | Date;
export type ExtendedJsonArray = ExtendedJsonValue[];
export type ExtendedJsonObject = { [key: string]: ExtendedJsonValue };
/**
 * Represents an extended JSON value which can be one of the following:
 * - A scalar value (e.g., string, number, boolean, null, or other primitive types)
 * - An array of extended JSON values
 * - An object with string keys and extended JSON values as values
 *
 * The ExtendedJsonValue type is designed for scenarios where JSON-like data structures
 * need additional flexibility while maintaining type safety across various nested levels.
 *
 * This type can be used for defining complex data structures that extend beyond
 * the basic JSON specification but remain compatible with JSON-like formatting.
 */
export type ExtendedJsonValue = ExtendedJsonScalar | ExtendedJsonArray | ExtendedJsonObject;
