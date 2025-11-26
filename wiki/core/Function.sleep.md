# Function: sleep()

```ts
function sleep(ms, ac?): Promise<void>;
```

Defined in: [IdeaProjects/kit/kit/src/core/sleep.ts:20](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/sleep.ts#L20)

Suspends the execution for a specified duration in milliseconds.
If a [PromiseController](Class.PromiseController.md) is provided, the sleep can be interrupted.

Notes about the controller model:
- The controller is an attachable, many-to-many broadcaster. `abort()` notifies all handlers
  currently registered on the controller, regardless of which operation they belong to.
- `sleep` subscribes its own internal handler and automatically unsubscribes it when the
  timeout fires (resolve) or when an abort occurs (reject). External handlers added by the caller
  remain the caller's responsibility: unsubscribe them via `ac.off(...)` when no longer needed.

## Parameters

### ms

`number`

The number of milliseconds to pause execution.

### ac?

[`PromiseController`](Class.PromiseController.md)

Optional controller used to cancel the delay.

## Returns

`Promise`\<`void`\>

A Promise that resolves after the specified duration or rejects if interrupted.

## Throws

Throws if the PromiseController cancels the sleep with a reason.
