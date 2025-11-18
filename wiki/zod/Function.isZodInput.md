# Function: isZodInput()

```ts
function isZodInput<T>(schema, o): o is input<T>;
```

Defined in: [zod-utils.ts:11](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/zod/zod-utils.ts#L11)

Determines if a given input conforms to the specified Zod schema.

## Type Parameters

### T

`T` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The type of the Zod schema.

## Parameters

### schema

`T`

The Zod schema to validate the input against.

### o

`unknown`

The input to check.

## Returns

`o is input<T>`

True if the input matches the schema's expected input type, otherwise false.
