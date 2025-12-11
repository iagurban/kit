# Function: isArrayOf()

```ts
function isArrayOf<T>(options?): Checker<T[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-array-of.ts:20](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-array-of.ts#L20)

Creates a checker that validates arrays with optional constraints.

Supports minimum/maximum length, an element checker, and a custom predicate.
The resulting checker also exposes a descriptive `type` label.

## Type Parameters

### T

`T`

The element type being validated.

## Parameters

### options?

`ArrayOptions`\<`T`\> = `{}`

Optional validation options.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`T`[]\>

A checker for arrays of `T`.
