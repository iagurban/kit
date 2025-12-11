# Function: isNumberOf()

```ts
function isNumberOf(options?): Checker<number>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-number-of.ts:24](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-number-of.ts#L24)

Creates a checker that validates `number` values with optional constraints.

Supports min/max (inclusive or exclusive), `integer`, `finite`, `safe` (safe integer),
and a custom predicate. The resulting checker provides a descriptive `type` label.

## Parameters

### options?

`NumberOptions` = `{}`

Optional validation options.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`number`\>

A checker for numbers.
