# Function: catching()

Executes a function and provides a mechanism to handle errors by executing a provided error-handling function.

## Param

The function to execute, which may throw an error.

## Param

The error-handling function to execute if an error is thrown. Receives the error as its argument.

## Call Signature

```ts
function catching<T, C>(fn, onCatch): T | C;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:1](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/flow/catching.ts#L1)

### Type Parameters

#### T

`T`

#### C

`C`

### Parameters

#### fn

() => `T`

#### onCatch

(`error`) => `C`

### Returns

`T` \| `C`

## Call Signature

```ts
function catching<T>(fn, onCatch): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:2](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/flow/catching.ts#L2)

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `T`

#### onCatch

(`error`) => `T`

### Returns

`T`
