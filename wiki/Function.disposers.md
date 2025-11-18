# Function: disposers()

```ts
function disposers(initializers, onInit?): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/disposers.ts:43](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/disposers.ts#L43)

Creates a composite disposer function that manages multiple disposable resources.
Particularly useful for managing MobX reactions and store cleanup in a unified way.

## Parameters

### initializers

readonly (`ObjectDisposable` \| `FunctionDisposable`)[]

An array of disposable resources that can be either:
  - Functions that perform cleanup when called (FunctionDisposable)
  - Objects with init/destroy methods (ObjectDisposable)
The function automatically calls init() for object-style disposables during setup.

### onInit?

() => `void`

Optional callback function to be executed after all initializers are set up

## Returns

A cleanup function that when called:
  - Executes all collected disposers in the order they were added
  - Collects any errors that occur during disposal
  - If any errors occurred, throws an Errors instance containing all collected errors

```ts
(): void;
```

### Returns

`void`

## Example

```typescript
const cleanup = disposers([
  // Function-style disposable
  reaction(() => ..., () => ...)),
  autorun(() => ...),

  // Object-style disposable - e.g. some store with .init() and .destroy() methods
  {
    init: () => { // setup logic },
    destroy: () => { // cleanup logic }
  }
]);

// Later, cleanup all resources (or return it to somebody, who will clean up)
cleanup();
```

## Throws

If any disposers throw during cleanup, all errors are collected
                 and thrown as a single Errors instance
