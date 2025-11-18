# Function: samples()

```ts
function samples(length, by?): number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/array-utils.ts:34](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/collections/array-utils.ts#L34)

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
