# Function: useMobxRootStoreRegistration()

```ts
function useMobxRootStoreRegistration(store): void;
```

Defined in: [mobx/use-mobx-root-store-registration.ts:12](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/mobx/use-mobx-root-store-registration.ts#L12)

A custom hook for managing the registration of a MobX root store.

This hook registers a provided store as the MobX root store on mount and unregisters it on unmount.
It re-registers the store whenever the `store` dependency changes.

## Parameters

### store

The MobX root store to be registered or unregistered.

`object` | `undefined`

## Returns

`void`
