# Function: isBooleanOf()

```ts
function isBooleanOf<T>(options?): Checker<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-boolean-of.ts:18](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-boolean-of.ts#L18)

Creates a checker that validates boolean values with optional constraints.

Supports fixing to an exact value and a custom predicate. The resulting checker
exposes a descriptive `type` label.

## Type Parameters

### T

`T` *extends* `boolean` = `boolean`

The boolean subtype to validate.

## Parameters

### options?

`BooleanOptions`\<`T`\> = `{}`

Optional validation options.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`T`\>

A checker for boolean values.
