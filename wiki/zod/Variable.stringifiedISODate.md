# Variable: stringifiedISODate

```ts
const stringifiedISODate: ZodCodec<ZodISODateTime, ZodDate>;
```

Defined in: [stringified-types.ts:53](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/zod/stringified-types.ts#L53)

A Zod codec that validates and transforms ISO-formatted date strings.

This variable utilizes Zod's codec to work with ISO 8601-formatted date strings,
converting them into JavaScript `Date` objects and vice versa.

Validation Rules:
- The input must be a valid ISO 8601 date string.
- The resulting Date object should represent a valid date.

Encoding:
- Converts a `Date` object into an ISO 8601 string using `toISOString()`.

Decoding:
- Converts an ISO 8601 string into a `Date` object.

Refinement:
- Ensures that the decoded `Date` object represents a valid date.
- Throws an error if the date is invalid.

Throws:
- An error if the given date string is not valid or cannot be parsed into a valid `Date` object.
