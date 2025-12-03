# Function: groupedBy()

```ts
function groupedBy<T, K>(o, by): Record<K, T[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/object-utils.ts:32](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/object-utils.ts#L32)

Groups the elements of an array based on the result of a callback function.

## Type Parameters

### T

`T`

The type of the elements in the input array.

### K

`K` *extends* `string` \| `number` \| `symbol`

The type of the keys returned by the callback function.

## Parameters

### o

readonly `T`[]

The input array to be grouped.

### by

(`t`) => `K`

A callback function that takes an element of the array and returns a key
to group by.

## Returns

`Record`\<`K`, `T`[]\>

An object where the keys are the results of the callback function, and
the values are arrays of elements from the input array that correspond to each key.
