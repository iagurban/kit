# Function: retrying()

```ts
function retrying<T>(shouldRetry, fn): Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/retrying.ts:32](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/async/retrying.ts#L32)

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
