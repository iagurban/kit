# Function: errorToString()

```ts
function errorToString(error): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/error-utils.ts:10](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/error-utils.ts#L10)

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
