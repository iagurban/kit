# Function: isNotNull()

```ts
function isNotNull<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:45](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/checks.ts#L45)

A type guard function that determines if a given value is not null.

## Type Parameters

### T

`T`

The type of the input value.

## Parameters

### o

The value to be checked.

`T` | `null`

## Returns

`o is T`

Returns true if the value is not null; otherwise, returns false.
