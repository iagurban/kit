# Function: mappedBy()

```ts
function mappedBy<T, K>(o, by): Record<K, T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/object-utils.ts:10](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/object-utils.ts#L10)

Maps an array of objects to an object where keys are derived from a specified property or computation.

## Type Parameters

### T

`T`

The type of elements in the input array.

### K

`K` *extends* `string` \| `number` \| `symbol`

The type of the keys, which extends string, number, or symbol.

## Parameters

### o

readonly `T`[]

The input array to be mapped.

### by

(`t`) => `K`

A function that determines the key for each element in the array.

## Returns

`Record`\<`K`, `T`\>

An object where each key corresponds to the result of the `by` function applied to an element in the array, and the value is the corresponding element.
