# Function: isInteger()

```ts
function isInteger(o): o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:124](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/checks.ts#L124)

Determines whether the provided value is an integer.

This function checks if the input is a number and verifies
that it has no fractional component by comparing the value
to its truncated version.

## Parameters

### o

`unknown`

The value to be checked.

## Returns

`o is number`

Returns true if the value is a number and an integer, false otherwise.
