# Variable: isNotUndefined()

```ts
const isNotUndefined: <T>(o) => o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:57](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/checks.ts#L57)

A type guard function that checks whether a given value is not `undefined`.

This function takes in a variable of type `T | undefined` and returns a boolean value indicating
whether the variable is of type `T`.

## Type Parameters

### T

`T`

The type of the input value being evaluated.

## Parameters

### o

The value to be checked.

`T` | `undefined`

## Returns

`o is T`

A boolean value indicating whether the value is not `undefined`.
