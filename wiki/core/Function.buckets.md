# Function: buckets()

```ts
function buckets<T>(a, size): T[][];
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/array-utils.ts:10](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/utils/array-utils.ts#L10)

Splits an array into smaller sub-arrays (buckets) of a specified size.

## Type Parameters

### T

`T`

The type of elements in the input array.

## Parameters

### a

readonly `T`[]

The input array to be divided into buckets.

### size

`number`

The maximum size of each bucket (sub-array).

## Returns

`T`[][]

An array of sub-arrays, where each sub-array contains elements from the input array.
                 The last sub-array may contain fewer elements if the input array cannot be evenly divided.
