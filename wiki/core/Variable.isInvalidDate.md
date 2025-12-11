# Variable: isInvalidDate()

```ts
const isInvalidDate: (o) => o is Date;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-invalid-date.ts:7](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-invalid-date.ts#L7)

Checks if a value is a Date object, but contains an invalid time (NaN).
Analogous to Number.isNaN but for Dates.

## Parameters

### o

`unknown`

## Returns

`o is Date`
