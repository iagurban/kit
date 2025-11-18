# Function: errorToString()

```ts
function errorToString(error): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/error-utils.ts:10](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/utils/error-utils.ts#L10)

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
