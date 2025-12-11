# Function: isStringOf()

```ts
function isStringOf<T>(options?): Checker<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-string-of.ts:22](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-string-of.ts#L22)

Creates a checker that validates strings with optional constraints.

Supports minimum/maximum length, regex pattern, an enum of allowed values,
and a custom predicate. The resulting checker exposes a descriptive `type` label.

## Type Parameters

### T

`T` *extends* `string` = `string`

The string subtype (union) to validate.

## Parameters

### options?

`StringOptions`\<`T`\> = `{}`

Optional validation options.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`T`\>

A checker for strings.
