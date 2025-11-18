# Function: errorFromUnknown()

```ts
function errorFromUnknown(e): Error;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/error-utils.ts:24](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/error-utils.ts#L24)

A utility function that converts an unknown value into an instance of the Error type.

If the provided parameter is an instance of the Error object, it will return the parameter as is.
Otherwise, it converts the unknown value to a string and creates a new Error instance with the string as its message.

This is useful for ensuring that error handling logic always works with Error objects.

## Parameters

### e

`unknown`

The value to be converted into an Error object.

## Returns

`Error`

The resulting Error object.
