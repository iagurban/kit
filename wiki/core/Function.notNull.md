# Function: notNull()

```ts
function notNull<T>(o, message?): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/not-null.ts:15](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/flow/not-null.ts#L15)

Ensures that the provided value is not null or undefined. If the value is null or undefined,
an error is thrown based on the specified message or error-generating function.

## Type Parameters

### T

`T`

## Parameters

### o

The value to check for null or undefined.

`T` | `null` | `undefined`

### message?

An error message string, or
       a function returning either a custom error or an error message string.

`string` | () => `string` \| `Error`

## Returns

`T`

The non-null, non-undefined value.

## Throws

If the value is null or undefined, and a string is provided as the message.

## Throws

If the value is null or undefined and a function generating an Error is provided.
