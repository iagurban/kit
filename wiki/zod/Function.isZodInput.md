# Function: isZodInput()

```ts
function isZodInput<T>(schema, o): o is input<T>;
```

Defined in: [zod-utils.ts:21](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/zod/zod-utils.ts#L21)

Determines if a given value is "decodeable" input-value of the given Zod schema.

## Type Parameters

### T

`T` *extends* `ZodMiniType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The type of the Zod schema.

## Parameters

### schema

`T`

The Zod schema to validate against.

### o

`unknown`

The input to check.

## Returns

`o is input<T>`

True if the input matches the schema's expected input type, otherwise false.
