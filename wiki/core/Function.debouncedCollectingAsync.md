# Function: debouncedCollectingAsync()

```ts
function debouncedCollectingAsync<Args, T, R>(
   delay, 
   collect, 
   fn): (...args) => Promise<T> & object;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/debounced-collecting-async.ts:19](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/async/debounced-collecting-async.ts#L19)

Creates a function that combines debouncing logic with asynchronous callback execution.
The function allows for multiple calls within a specified delay to be grouped and processed together,
ensuring that the provided asynchronous function is executed only after the delay has elapsed.

## Type Parameters

### Args

`Args` *extends* readonly `unknown`[]

The type of arguments that the debounced function accepts.

### T

`T`

The type of the value returned by the provided asynchronous function.

### R

`R`

The type used to collect and accumulate arguments within the delay period.

## Parameters

### delay

`number`

The debounce delay in milliseconds; during this time, additional calls are collected.

### collect

(`o`, ...`args`) => `R`

A function to process and accumulate arguments over multiple calls. It receives the current accumulation and the new arguments, and returns the updated value.

### fn

(`o`) => `Promise`\<`T`\>

The asynchronous function to execute once the debounce delay elapses, using the accumulated arguments.

## Returns

(...`args`) => `Promise`\<`T`\> & `object`

A debounced function that processes arguments with the provided collect method and executes the asynchronous function after the delay.
Includes a `cancel` method to cancel pending executions.
