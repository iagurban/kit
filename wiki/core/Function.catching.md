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

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:8](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/flow/catching.ts#L8)

Executes a function and provides a mechanism to handle errors by executing a provided error-handling function.

### Type Parameters

#### T

`T`

#### C

`C`

### Parameters

#### fn

() => `T`

The function to execute, which may throw an error.

#### onCatch

(`error`) => `C`

The error-handling function to execute if an error is thrown. Receives the error as its argument.

### Returns

`T` \| `C`

The result of the executed function if no error occurs, or the result of the error-handling function if an error is caught.

## Call Signature

```ts
function catching<T>(fn, onCatch): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:16](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/flow/catching.ts#L16)

Executes a function and provides a mechanism to handle errors by executing a provided error-handling function.

### Type Parameters

#### T

`T`

### Parameters

#### fn

() => `T`

The function to execute, which may throw an error.

#### onCatch

(`error`) => `T`

The error-handling function to execute if an error is thrown. Receives the error as its argument.

### Returns

`T`

The result of the executed function if no error occurs, or the result of the error-handling function if an error is caught.
