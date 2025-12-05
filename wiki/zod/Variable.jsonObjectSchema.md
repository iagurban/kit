# Variable: jsonObjectSchema

```ts
const jsonObjectSchema: ZodRecord<ZodString, ZodType<JsonValue, unknown, $ZodTypeInternals<JsonValue, unknown>>>;
```

Defined in: [json-schema.ts:40](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/json-schema.ts#L40)

A Zod schema for validating JSON objects.
A JSON object is a record with string keys and JSON values.
