# Function: samples()

```ts
function samples(length, by?): number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/array-utils.ts:34](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/array-utils.ts#L34)

Generates an array of numbers based on the specified length and an optional mapping function.

## Parameters

### length

`number`

The number of elements in the resulting array.

### by?

(`idx`) => `number`

An optional function to determine the values of the array.
                                         It receives the current index as an argument and returns
                                         the value for that index. If not provided, the array will
                                         be filled with incremental numbers starting from 0.

## Returns

`number`[]

An array of numbers created based on the provided length and optional function.
