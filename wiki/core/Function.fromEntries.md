# Function: fromEntries()

```ts
function fromEntries<T, V>(pairs): Record<T, V>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/object-utils.ts:100](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/collections/object-utils.ts#L100)

Converts an array of key-value pairs into an object.

## Type Parameters

### T

`T` *extends* `string` \| `number` \| `symbol`

The type of the keys in the resulting object. Must extend string, number, or symbol.

### V

`V`

The type of the values in the resulting object.

## Parameters

### pairs

readonly readonly \[`T`, `V`\][]

An array of key-value pairs where each element is a tuple containing a key and a value.

## Returns

`Record`\<`T`, `V`\>

An object constructed from the provided key-value pairs.
