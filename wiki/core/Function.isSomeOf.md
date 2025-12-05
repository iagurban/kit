# Function: isSomeOf()

```ts
function isSomeOf<Vs>(...checkers): Checker<Vs[number]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:258](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/checks.ts#L258)

A utility function that checks whether a given value satisfies at least one of the provided type-checking functions.

## Type Parameters

### Vs

`Vs` *extends* readonly `unknown`[]

## Parameters

### checkers

...[`Checkers`](TypeAlias.Checkers.md)\<`Vs`\>

A rest parameter consisting of an array of type-checking functions.
Each function should take a value of an unknown type and validate if it matches a specific type or condition.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`Vs`\[`number`\]\>

A function that takes an unknown value and returns `true` if the value satisfies
at least one of the provided type-checking functions, or `false` otherwise.
