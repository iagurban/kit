# Function: isSomeOf()

```ts
function isSomeOf<Vs>(...checkers): Checker<Vs[number]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-some-of.ts:11](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-some-of.ts#L11)

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
