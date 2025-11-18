# Function: errorFromUnknown()

```ts
function errorFromUnknown(e): Error;
```

Defined in: [IdeaProjects/kit/kit/src/core/error-utils.ts:24](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/error-utils.ts#L24)

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
