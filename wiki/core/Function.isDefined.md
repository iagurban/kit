# Function: isDefined()

```ts
function isDefined<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:24](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/checks.ts#L24)

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
