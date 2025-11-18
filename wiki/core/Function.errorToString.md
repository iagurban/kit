# Function: errorToString()

```ts
function errorToString(error): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/error-utils.ts:10](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/error-utils.ts#L10)

Converts an unknown error value into a string representation.

If the provided error is an instance of the `Error` object, its `message` property
is returned. Otherwise, the error is coerced to a string using the `String` function.

## Parameters

### error

`unknown`

The value representing the error to be converted into a string format.

## Returns

`string`

A string representation of the provided error.
