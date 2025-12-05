# Function: isTruthy()

```ts
function isTruthy<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:58](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/checks.ts#L58)

Determines whether a value is truthy, filtering out falsy values such as
`undefined`, `null`, `false`, `0`, and empty strings (`''`).

This is a TypeScript type guard function that narrows the type of the given
value to exclude falsy values.

## Type Parameters

### T

`T`

The original type of the input value.

## Parameters

### o

The value to be evaluated.

`false` | `""` | `0` | `T` | `null` | `undefined`

## Returns

`o is T`

Returns `true` if the value is truthy, otherwise `false`.
