# Function: samples()

```ts
function samples(length, by?): number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/array-utils.ts:34](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/array-utils.ts#L34)

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
