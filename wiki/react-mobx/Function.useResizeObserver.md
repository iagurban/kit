# Function: useResizeObserver()

```ts
function useResizeObserver(callback): GraphNodeViewStore;
```

Defined in: [mobx/use-resize-observer.ts:57](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/react/mobx/use-resize-observer.ts#L57)

useResizeObserver is a custom hook that creates a reference to a `GraphNodeViewStore`
instance for handling resize events using a provided callback function.

## Parameters

### callback

(`e`) => `void`

A function that will be triggered when a resize event occurs.
                             It receives a single parameter of type `ResizeObserverEntry`,
                             which contains details of the resize event.

## Returns

`GraphNodeViewStore`

Returns an instance of `GraphNodeViewStore` that manages
                              the resize observer and its lifecycle.
