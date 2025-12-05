# Variable: jsonLiteralSchema

```ts
const jsonLiteralSchema: ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean, ZodNull]>;
```

Defined in: [json-schema.ts:9](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/zod/json-schema.ts#L9)

A Zod schema for validating JSON literal values.
A JSON literal can be a string, number, boolean, or null.
