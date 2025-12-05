# Variable: isNull()

```ts
const isNull: (o) => o is null;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:102](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/checks.ts#L102)

Checks if the given value is strictly null.

This function is a type predicate that determines whether the input value
is of type `null`. It returns `true` only if the provided value is strictly
equal to `null`; otherwise, it returns `false`.

## Parameters

### o

`unknown`

The value to check.

## Returns

`o is null`

A boolean indicating whether the input value is null.
