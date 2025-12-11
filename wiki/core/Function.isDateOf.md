# Function: isDateOf()

```ts
function isDateOf(options?): Checker<Date>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-date-of.ts:20](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-date-of.ts#L20)

Creates a checker that validates `Date` values with optional constraints.

Ensures the date is valid by default (i.e., its time is not `NaN`). You may allow
invalid dates by setting `allowInvalid: true`. Supports min/max bounds (accepting
`Date`, timestamp `number`, or ISO `string`) and a custom predicate.

## Parameters

### options?

`DateOptions` = `{}`

Optional validation options.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`Date`\>

A checker for `Date` values.
