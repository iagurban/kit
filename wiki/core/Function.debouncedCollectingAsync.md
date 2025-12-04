# Function: debouncedCollectingAsync()

```ts
function debouncedCollectingAsync<Args, T, R>(
   delay, 
   collect, 
   fn): (...args) => Promise<T> & object;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/debounced-collecting-async.ts:27](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/async/debounced-collecting-async.ts#L27)

Creates a debounced function that collects arguments from multiple calls and executes an async function with the collected arguments.

Here's how it works:
1. The first call to the created function starts a "window" of `delay` milliseconds.
2. Any subsequent calls during this window will have their arguments collected by the `collect` function.
   These calls do not reset the delay.
3. After the `delay` has passed, the `fn` function is called with the final collected arguments.
4. Each call to the debounced function returns a promise. This promise resolves with the result of the `fn` call
   that consumes the arguments from that call. All calls within the same window will be resolved with the same result.

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

The debounce delay in milliseconds. This is the "window" during which calls are collected.

### collect

(`o`, ...`args`) => `R`

A function to process and accumulate arguments over multiple calls. It receives the current accumulation and the new arguments, and returns the updated value.

### fn

(`o`) => `Promise`\<`T`\>

The asynchronous function to execute once the debounce delay elapses, using the accumulated arguments.

## Returns

(...`args`) => `Promise`\<`T`\> & `object`

A debounced function. Each call returns a promise that resolves with the result from `fn`. Includes a `cancel` method to abort pending executions.
