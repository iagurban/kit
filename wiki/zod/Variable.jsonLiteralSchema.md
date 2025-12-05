# Variable: jsonLiteralSchema

```ts
const jsonLiteralSchema: ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean, ZodNull]>;
```

Defined in: [json-schema.ts:9](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/json-schema.ts#L9)

A Zod schema for validating JSON literal values.
A JSON literal can be a string, number, boolean, or null.
