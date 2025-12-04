# Function: useMobxRootStoreRegistration()

```ts
function useMobxRootStoreRegistration(store): void;
```

Defined in: [mobx/use-mobx-root-store-registration.ts:12](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/mobx/use-mobx-root-store-registration.ts#L12)

A custom hook for managing the registration of a MobX root store.

This hook registers a provided store as the MobX root store on mount and unregisters it on unmount.
It re-registers the store whenever the `store` dependency changes.

## Parameters

### store

The MobX root store to be registered or unregistered.

`object` | `undefined`

## Returns

`void`
