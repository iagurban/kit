# Function: denyRecursion()

```ts
function denyRecursion<T>(action, err): (...args) => BusyGuardResult<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/functions/deny-recursion.ts:20](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/functions/deny-recursion.ts#L20)

Prevents recursive execution of a given function by ensuring that the function cannot be called again
while it is already running. If an attempt is made to call the function recursively, an error will be thrown.

## Type Parameters

### T

`T` *extends* [`AnyAnyFunction`](TypeAlias.AnyAnyFunction.md)

The type of the function to guard against recursion.

## Parameters

### action

`T`

The function to guard. This function will only be executed if it is not already in progress.

### err

The error to throw if a recursive call is attempted.
A static string or a callback function that generates an error or error message based on the arguments of the function.

`string` | (...`args`) => `string` \| `Error`

## Returns

A wrapped version of the original function that enforces
a "no recursion" rule. If the original function returns a promise, the guard ensures that recursion is only allowed
after the promise resolves.

```ts
(...args): BusyGuardResult<T>;
```

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns

`BusyGuardResult`\<`T`\>

## Throws

If a recursive invocation of the function is attempted, the provided error is thrown.
