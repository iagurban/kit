# Function: retrying()

```ts
function retrying<T>(shouldRetry, fn): Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/retrying.ts:33](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/async/retrying.ts#L33)

Executes a function with retry logic, allowing for custom retry conditions and delays.

## Type Parameters

### T

`T`

## Parameters

### shouldRetry

`ShouldRetryFn`

A function that determines whether a retry should occur.
       It receives the error and the current attempt number as arguments and returns a boolean
       (indicating whether to retry), a number (indicating how many milliseconds to wait before retrying),
       or anything else to terminate retries.

### fn

(`attempt`) => `Promise`\<`T`\>

The function to be executed with retries. It receives
       the current attempt number as an argument and returns a promise.

## Returns

`Promise`\<`T`\>

A promise that resolves with the result of the function if successful, or rejects
        with the last encountered error if no further retries are allowed.
