# Function: isArrayOf()

```ts
function isArrayOf<K>(isK): Checker<K[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:173](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/checks.ts#L173)

A utility function that checks if a given value is an array
whose elements satisfy a specific type guard function.

## Type Parameters

### K

`K`

The type of elements in the array.

## Parameters

### isK

[`Checker`](TypeAlias.Checker.md)\<`K`\>

A type guard function to validate individual elements of the array.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`K`[]\>

A function that takes in a value and
determines if it is an array of elements satisfying the `isK` type guard.
