# Function: sleep()

```ts
function sleep(ms, ac?): Promise<void>;
```

Defined in: [IdeaProjects/kit/kit/src/core/sleep.ts:13](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/sleep.ts#L13)

Suspends the execution for a specified duration in milliseconds.
If a PromiseController is provided, the sleep can be interrupted.

## Parameters

### ms

`number`

The number of milliseconds to pause execution.

### ac?

[`PromiseController`](Class.PromiseController.md)

Optional PromiseController instance used to control or cancel the delay.

## Returns

`Promise`\<`void`\>

A Promise that resolves after the specified duration or rejects if interrupted.

## Throws

Throws if the PromiseController cancels the sleep with a reason.
