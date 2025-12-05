# Variable: isNotNull()

```ts
const isNotNull: <T>(o) => o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:66](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/checks.ts#L66)

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
