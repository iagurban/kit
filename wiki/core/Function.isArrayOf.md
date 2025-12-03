# Function: isArrayOf()

```ts
function isArrayOf<K>(isK): Checker<K[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:203](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/checks.ts#L203)

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
