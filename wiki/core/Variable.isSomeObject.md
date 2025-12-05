# Variable: isSomeObject()

```ts
const isSomeObject: <T, R>(o) => o is T & Record<string, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:177](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/checks.ts#L177)

Checks if the provided value is an object and not null, while also ensuring
it is not an array. This function performs a type guard that verifies the
value is an object with string keys and values of a specific type.

## Type Parameters

### T

`T`

The original type of the input value.

### R

`R`

The type of the object property values.

## Parameters

### o

`T`

The value to check.

## Returns

`o is T & Record<string, R>`

- Returns true if the value is an object
and meets the specified constraints, otherwise false.
