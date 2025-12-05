# Function: isZodOutput()

```ts
function isZodOutput<T>(schema, o): o is output<T>;
```

Defined in: [zod-utils.ts:32](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/zod-utils.ts#L32)

Determines if a given value is "encodeable" output-value of the given Zod schema.

## Type Parameters

### T

`T` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The Zod schema type.

## Parameters

### schema

`T`

The Zod schema to validate against.

### o

`unknown`

The value to validate.

## Returns

`o is output<T>`

True if the value matches the schema's output type, otherwise false.
