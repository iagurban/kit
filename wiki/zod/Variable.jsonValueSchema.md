# Variable: jsonValueSchema

```ts
const jsonValueSchema: z.ZodType<JsonValue>;
```

Defined in: [json-schema.ts:22](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/zod/json-schema.ts#L22)

Represents a Zod schema for validating JSON values, supporting recursive structures.
A JSON value can be a literal (string, number, boolean, or null), an array of JSON values,
or an object with string keys and JSON value entries.

This schema employs a lazy evaluation to allow for recursive structures, enabling validation
of nested arrays or objects that reference the schema itself.

The structure captures all possible valid JSON types as per the JSON standard:
- Literals: string, number, boolean, null
- Arrays of JSON values
- Objects with string keys and JSON value properties

Compatible with environments requiring the two-argument version of `z.record`.
