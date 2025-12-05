# Variable: jsonObjectSchema

```ts
const jsonObjectSchema: ZodRecord<ZodString, ZodType<JsonValue, unknown, $ZodTypeInternals<JsonValue, unknown>>>;
```

Defined in: [json-schema.ts:40](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/zod/json-schema.ts#L40)

A Zod schema for validating JSON objects.
A JSON object is a record with string keys and JSON values.
