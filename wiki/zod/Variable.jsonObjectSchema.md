# Variable: jsonObjectSchema

```ts
const jsonObjectSchema: ZodRecord<ZodString, ZodType<JsonValue, unknown, $ZodTypeInternals<JsonValue, unknown>>>;
```

Defined in: [json-schema.ts:40](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/zod/json-schema.ts#L40)

A Zod schema for validating JSON objects.
A JSON object is a record with string keys and JSON values.
