# Variable: jsonLiteralSchema

```ts
const jsonLiteralSchema: ZodMiniUnion<readonly [ZodMiniString<string>, ZodMiniNumber<number>, ZodMiniBoolean<boolean>, ZodMiniNull]>;
```

Defined in: [json-schema.ts:9](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/zod/json-schema.ts#L9)

A Zod schema for validating JSON literal values.
A JSON literal can be a string, number, boolean, or null.
