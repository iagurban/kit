# Variable: jsonLiteralSchema

```ts
const jsonLiteralSchema: ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean, ZodNull]>;
```

Defined in: [json-schema.ts:9](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/zod/json-schema.ts#L9)

A Zod schema for validating JSON literal values.
A JSON literal can be a string, number, boolean, or null.
