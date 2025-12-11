# Variable: isDefined()

```ts
const isDefined: <T>(o) => o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:10](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L10)

Checks if a given value is neither `undefined` nor `null`.

## Type Parameters

### T

`T`

## Parameters

### o

The value to check.

`T` | `null` | `undefined`

## Returns

`o is T`

Returns `true` if the value is defined (not `undefined` or `null`), otherwise `false`.
