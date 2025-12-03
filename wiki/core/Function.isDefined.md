# Function: isDefined()

```ts
function isDefined<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:24](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/checks.ts#L24)

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
