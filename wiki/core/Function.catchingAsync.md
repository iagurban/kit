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

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:20](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/flow/catching.ts#L20)

### Type Parameters

#### T

`T`

#### C

`C`

### Parameters

#### fn

() => `Promise`\<`T`\>

#### onCatch

(`e`) => `C` \| `Promise`\<`C`\>

### Returns

`Promise`\<`T` \| `C`\>

## Call Signature

```ts
function catchingAsync<T>(fn, onCatch): Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:24](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/flow/catching.ts#L24)

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `Promise`\<`T`\>

#### onCatch

(`e`) => `T` \| `Promise`\<`T`\>

### Returns

`Promise`\<`T`\>
