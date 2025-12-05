# Variable: isDefined()

```ts
const isDefined: <T>(o) => o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:45](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/checks.ts#L45)

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
