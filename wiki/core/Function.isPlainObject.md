# Function: isPlainObject()

```ts
function isPlainObject<T, R>(o): o is T & Record<string, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:137](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/checks.ts#L137)

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
