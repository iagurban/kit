# Function: mapArrayIfNotEmpty()

```ts
function mapArrayIfNotEmpty<T, U>(
   array, 
   mapper, 
   empty): U[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/array-utils.ts:137](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/collections/array-utils.ts#L137)

Applies a mapping function to each element of an array if the array is not empty.
If the array is empty, a fallback function is executed and its result is returned as an array.

## Type Parameters

### T

`T`

The type of elements in the input array.

### U

`U`

The type of elements in the resulting array.

## Parameters

### array

`T`[]

The array to be mapped. If it is empty, the fallback function will be used.

### mapper

(`t`, `i`, `arr`) => `U`

The function to apply to each element of the array.

### empty

() => `U`

A function that is called to provide a default value when the array is empty.

## Returns

`U`[]

A new array containing the results of applying the `mapper` function to each element of the array,
or an array containing the result of the `empty` function if the array is empty.
