# Function: isBigIntOf()

```ts
function isBigIntOf(options?): Checker<bigint>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-bigint-of.ts:20](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-bigint-of.ts#L20)

Creates a checker that validates `bigint` values with optional constraints.

Supports min/max bounds (accepts `number` or `bigint` inputs), a `fitsInNumber`
constraint to limit into JS safe integer range, and a custom predicate.
The resulting checker exposes a descriptive `type` label.

## Parameters

### options?

`BigIntOptions` = `{}`

Optional validation options.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`bigint`\>

A checker for `bigint` values.
