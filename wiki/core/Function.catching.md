# Function: catching()

Executes a function and, if an exception is thrown, executes a fallback function.

## Template

## Param

The function to execute. If it runs without throwing, its result is returned.

## Param

The fallback function to execute if the first function throws an exception.

## Call Signature

```ts
function catching<T, C>(fn, onCatch): T | C;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:1](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/flow/catching.ts#L1)

### Type Parameters

#### T

`T`

#### C

`C`

### Parameters

#### fn

() => `T`

#### onCatch

() => `C`

### Returns

`T` \| `C`

## Call Signature

```ts
function catching<T>(fn, onCatch): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:2](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/flow/catching.ts#L2)

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `T`

#### onCatch

() => `T`

### Returns

`T`
