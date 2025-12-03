# Class: PromiseController

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:21](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/async/promise-controller.ts#L21)

A class that provides a mechanism to broadcast abortion (cancellation) events.

Architectural choice: attachable many-to-many controller
- This controller can be shared across multiple concurrent or sequential operations.
- Calling [abort](#abort) notifies all handlers that are registered at the moment of the call,
  regardless of which operation they belong to or whether some operations have already finished.
- Libraries that use the controller (e.g., [sleep](Function.sleep.md)) must unsubscribe their own internal
  handlers when their operation completes or is aborted.
- Client code is responsible for unsubscribing its own handlers via [off](#off) when they are no
  longer needed (e.g., after a successful operation) to avoid receiving future abort notifications.

This aligns with a broadcaster-style cancellation model similar in spirit to AbortController,
without introducing a new cancellable-promise API. If per-operation isolation is required,
create a dedicated controller instance for that operation or ensure handlers are removed on
completion.

## Accessors

### aborted {#aborted}

#### Get Signature

```ts
get aborted(): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:31](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/async/promise-controller.ts#L31)

Retrieves the current aborted state.

##### Returns

`boolean`

The value of the aborted state.

## Methods

### abort() {#abort}

```ts
abort(reason): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:47](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/async/promise-controller.ts#L47)

Aborts and notifies all currently registered abort handlers.

Notes:
- Handlers are invoked in the order provided by the underlying map’s iteration order.
- After notification, all handlers are cleared, and the controller remains in the aborted state.
- If any handler throws, an Errors aggregating all thrown errors is raised after
  all handlers have been invoked.

#### Parameters

##### reason

`string`

The reason for aborting.

#### Returns

`void`

- Throws an aggregated error if some handlers throw.

***

### off() {#off}

```ts
off(fn, all?): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:87](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/async/promise-controller.ts#L87)

Removes a handler from the list of abort handlers. If `all` is true, removes all instances; otherwise, decrements its count.

#### Parameters

##### fn

(`reason`) => `void`

The handler to remove.

##### all?

`boolean` = `false`

If true, removes all occurrences. Defaults to removing a single occurrence.

#### Returns

`void`

This method does not return a value.

***

### on() {#on}

```ts
on(fn): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:76](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/async/promise-controller.ts#L76)

Registers an abort handler.

Handlers will be called upon [abort](#abort) while they remain registered. If you add a handler for a
specific operation, remember to call [off](#off) when the operation finishes successfully and you no longer
want to receive abort notifications.

#### Parameters

##### fn

(`reason`) => `void`

A callback function that receives the abort reason.

#### Returns

`void`
