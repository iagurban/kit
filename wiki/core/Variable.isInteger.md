# Variable: isInteger()

```ts
const isInteger: (o) => o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-integer.ts:14](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-integer.ts#L14)

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
