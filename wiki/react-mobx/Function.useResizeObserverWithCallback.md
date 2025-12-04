# Function: useResizeObserverWithCallback()

```ts
function useResizeObserverWithCallback<T>(...cb): GraphNodeViewStore;
```

Defined in: [mobx/use-resize-observer.ts:84](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/react/mobx/use-resize-observer.ts#L84)

A custom hook that uses a resize observer to track changes in the size of an element,
and executes a memoized callback function when a resize event occurs.

## Type Parameters

### T

`T` *extends* (`e`) => `any`

The type of the callback function.

## Parameters

### cb

...\[`T`, `DependencyList`\]

The parameters for the `useCallback` hook.
The first parameter is the callback function to be executed on resize, and the second is the dependency array.

## Returns

`GraphNodeViewStore`

An instance of `GraphNodeViewStore` that manages the resize observer.
