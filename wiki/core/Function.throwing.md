# Function: throwing()

```ts
function throwing<T>(e): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/throwing.ts:11](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/flow/throwing.ts#L11)

A generic utility function that throws an exception provided by the given function.
Handy for throwing in ternary operators.

## Type Parameters

### T

`T` = `undefined`

The expected return type of the function, defaults to `undefined`.
              This is effectively the type of the value that would have been returned if the function did not throw.

## Parameters

### e

() => `unknown`

A function that produces the error or exception to be thrown.

## Returns

`T`

This function does not return a value as it always throws.

## Throws

The error or exception returned by the provided function `e`.
