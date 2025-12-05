# Variable: isTruthy()

```ts
const isTruthy: <T>(o) => o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:79](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/checks.ts#L79)

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
