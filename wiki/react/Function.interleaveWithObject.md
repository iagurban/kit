# Function: interleaveWithObject()

```ts
function interleaveWithObject<T>(a, o): T[];
```

Defined in: [interleave-with-object.ts:12](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/react/interleave-with-object.ts#L12)

Creates a new array by interleaving the elements of the input array with the result of a callback function.

## Type Parameters

### T

`T`

The type of elements in the input array.

## Parameters

### a

`T`[]

The input array to be interleaved.

### o

(`prev`, `i`) => `T`

A callback function invoked for each pair of elements in the array.
                                   The function takes the current element and its index as arguments and
                                   returns the value to be interleaved.

## Returns

`T`[]

A new array where each pair of elements is interleaved with the result of the callback function.
               If the input array has fewer than two elements, it is returned unchanged.
