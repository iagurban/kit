# Function: isTuple()

```ts
function isTuple<Vs>(...items): Checker<Vs>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:281](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/checks.ts#L281)

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
