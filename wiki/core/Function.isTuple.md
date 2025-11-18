# Function: isTuple()

```ts
function isTuple<Vs>(...items): Checker<Vs>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:244](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/checks.ts#L244)

A utility function used to determine whether a given value is a tuple of a specific structure.

This function accepts an array of type checkers and validates if the provided value is a tuple
matching the specified type structure. Each element in the tuple is validated against its corresponding type checker.

## Type Parameters

### Vs

`Vs` *extends* readonly `unknown`[]

## Parameters

### items

...[`Checkers`](TypeAlias.Checkers.md)\<`Vs`\>

An array of type-checking functions, one for each element in the tuple.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`Vs`\>

- A function that takes a value `o` and checks if it matches the tuple defined by the specified type checkers.
