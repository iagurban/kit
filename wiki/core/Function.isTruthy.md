# Function: isTruthy()

```ts
function isTruthy<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:58](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/checks.ts#L58)

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
