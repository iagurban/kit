# Variable: isTruthy()

```ts
const isTruthy: <T>(o) => o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:44](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L44)

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
