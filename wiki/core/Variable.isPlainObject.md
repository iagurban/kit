# Variable: isPlainObject()

```ts
const isPlainObject: <T, R>(o) => o is T & Record<string, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:161](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/checks.ts#L161)

Checks if a given value is a plain object.

A value is considered a plain object if it is not null, has an object type,
and its prototype is exactly the default `Object.prototype`.

## Type Parameters

### T

`T`

The type of the input value.

### R

`R`

The inferred type of the value's properties.

## Parameters

### o

`T`

The value to check.

## Returns

`o is T & Record<string, R>`

`true` if the value is a plain object, otherwise `false`.
