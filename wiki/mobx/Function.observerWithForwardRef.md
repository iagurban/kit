# Function: observerWithForwardRef()

```ts
function observerWithForwardRef<P, T>(render): FunctionComponent<PropsWithoutRef<P> & RefAttributes<T>>;
```

Defined in: [mobx/observer-with-forward-ref.ts:26](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/mobx/observer-with-forward-ref.ts#L26)

Enhances a given component with both observer and forwardRef functionality.

This function wraps a React component, allowing it to observe and react to
changes in MobX observables while also supporting React's `forwardRef` mechanism.
It combines the functionalities of `observer` from MobX React and
`forwardRef` from React.

## Type Parameters

### P

`P`

The props type of the wrapped component.

### T

`T`

The type of the forwarded ref.

## Parameters

### render

`ForwardRefRenderFunction`\<`T`, `PropsWithoutRef`\<`P`\>\>

The render function defining the
component logic, taking props and a ref as arguments.

## Returns

`FunctionComponent`\<`PropsWithoutRef`\<`P`\> & `RefAttributes`\<`T`\>\>

A new component that observes MobX state and
handles forwarded refs.
