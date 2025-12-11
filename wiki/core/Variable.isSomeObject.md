# Variable: isSomeObject()

```ts
const isSomeObject: <T, R>(o) => o is T & Record<string, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-some-object.ts:14](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-some-object.ts#L14)

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
