# Function: isZodOutput()

```ts
function isZodOutput<T>(schema, o): o is output<T>;
```

Defined in: [zod-utils.ts:22](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/zod/zod-utils.ts#L22)

Checks if the provided value matches the expected output type of the given Zod schema.

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
