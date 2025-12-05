# Function: pickRandomItems()

```ts
function pickRandomItems<T>(count, from): T[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/array-utils.ts:58](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/collections/array-utils.ts#L58)

Selects a specified number of random unique items from a given array.

## Type Parameters

### T

`T`

## Parameters

### count

`number`

The number of items to randomly select from the array. Must be a non-negative integer less than or equal to the array's length.

### from

readonly `T`[]

The array from which random items will be selected. The input array is not modified.

## Returns

`T`[]

An array containing the randomly selected items. No duplicates are included in the resulting array.

## Throws

Throws an error if the count is negative, not an integer, or exceeds the length of the input array.
