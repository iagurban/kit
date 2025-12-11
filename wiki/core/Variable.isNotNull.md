# Variable: isNotNull()

```ts
const isNotNull: <T>(o) => o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:31](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L31)

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
