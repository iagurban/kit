# Variable: stringifiedBigint

```ts
const stringifiedBigint: ZodCodec<ZodString, ZodBigInt>;
```

Defined in: [stringified-types.ts:21](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/zod/stringified-types.ts#L21)

A codec for handling the conversion between a stringified representation of
a bigint and its actual bigint value. This ensures strict validation and
transformation between the two forms.

The codec encodes a bigint value into its string representation and decodes
a stringified integer back into a bigint. During decoding, it verifies that
the input string matches the regular expression for a valid integer
representation, including optional '+' or '-' prefixes.

Validation ensures the input is:
- A string matching the regex /^[+-]?[0-9]+$/
- A valid integer string that can be safely converted to bigint

Fields:
- encode: A function that converts a bigint to its string representation.
- decode: A function that converts a valid integer string to a bigint.
