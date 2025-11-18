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

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:1](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/flow/catching.ts#L1)

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

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:2](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/flow/catching.ts#L2)

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
