# Function: isZodInput()

```ts
function isZodInput<T>(schema, o): o is input<T>;
```

Defined in: [zod-utils.ts:21](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/zod/zod-utils.ts#L21)

Determines if a given value is "decodeable" input-value of the given Zod schema.

## Type Parameters

### T

`T` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

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
