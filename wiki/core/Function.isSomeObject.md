# Function: isSomeObject()

```ts
function isSomeObject<T, R>(o): o is T & Record<string, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:151](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/checks.ts#L151)

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
