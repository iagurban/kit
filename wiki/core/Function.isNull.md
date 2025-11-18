# Function: isNull()

```ts
function isNull(o): o is null;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:81](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/checks.ts#L81)

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
