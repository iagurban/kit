export type ExtendedJsonScalar = string | number | boolean | null | undefined | bigint | Date;
export type ExtendedJsonArray = ExtendedJsonValue[];
export type ExtendedJsonObject = { [key: string]: ExtendedJsonValue };
export type ExtendedJsonValue = ExtendedJsonScalar | ExtendedJsonArray | ExtendedJsonObject;
