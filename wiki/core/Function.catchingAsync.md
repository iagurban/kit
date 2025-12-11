# Function: catchingAsync()

Executes an asynchronous function and provides a mechanism to handle any errors that may occur during its execution.

## Template

## Param

An asynchronous function that will be executed.

## Param

A function that gets invoked with the caught error if `fn` throws or rejects. This function can return a value or a Promise.

## Call Signature

```ts
function catchingAsync<T, C>(fn, onCatch): Promise<T | C>;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:41](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/flow/catching.ts#L41)

Executes an asynchronous function and provides a mechanism to handle any errors that may occur during its execution.

### Type Parameters

#### T

`T`

#### C

`C`

### Parameters

#### fn

() => `Promise`\<`T`\>

An asynchronous function that will be executed.

#### onCatch

(`e`) => `C` \| `Promise`\<`C`\>

A function that gets invoked with the caught error if `fn` throws or rejects. This function can return a value or a Promise.

### Returns

`Promise`\<`T` \| `C`\>

A Promise that resolves to the result of `fn` if it succeeds, or to the outcome of `onCatch` if an error is caught.

## Call Signature

```ts
function catchingAsync<T>(fn, onCatch): Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:53](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/flow/catching.ts#L53)

Executes an asynchronous function and provides a mechanism to handle any errors that may occur during its execution.

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `Promise`\<`T`\>

An asynchronous function that will be executed.

#### onCatch

(`e`) => `T` \| `Promise`\<`T`\>

A function that gets invoked with the caught error if `fn` throws or rejects. This function can return a value or a Promise.

### Returns

`Promise`\<`T`\>

A Promise that resolves to the result of `fn` if it succeeds, or to the outcome of `onCatch` if an error is caught.
