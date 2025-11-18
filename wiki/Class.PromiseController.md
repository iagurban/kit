# Class: PromiseController

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:8](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L8)

A class that provides a mechanism to handle the abortion of asynchronous operations.
It maintains a set of listeners that can be notified when an abortion occurs.

## Accessors

### aborted {#aborted}

#### Get Signature

```ts
get aborted(): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:18](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L18)

Retrieves the current aborted state.

##### Returns

`boolean`

The value of the aborted state.

## Methods

### abort() {#abort}

```ts
abort(reason): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:28](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L28)

Aborts the current operation and notifies all registered abort handlers.

#### Parameters

##### reason

`string`

The reason for aborting the operation.

#### Returns

`void`

- Does not return a value. Throws an error if any abort handlers throw exceptions.

***

### off() {#off}

```ts
off(fn, all?): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:64](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L64)

Removes a function from the list of abort handlers. If `all` is true, it removes all instances of the given function; otherwise, it decrements its count.

#### Parameters

##### fn

(`reason`) => `void`

The function to remove from the list of abort handlers. It receives a reason string when called.

##### all?

`boolean` = `false`

If true, removes all occurrences of the function from the abort handlers. Defaults to false, removing only one occurrence.

#### Returns

`void`

This method does not return a value.

***

### on() {#on}

```ts
on(fn): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:53](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L53)

Registers a callback function to be executed when a specific event occurs.

#### Parameters

##### fn

(`reason`) => `void`

A callback function that receives a string parameter representing the reason for the event.

#### Returns

`void`
