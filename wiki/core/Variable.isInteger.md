# Variable: isInteger()

```ts
const isInteger: (o) => o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:145](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/checks.ts#L145)

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
