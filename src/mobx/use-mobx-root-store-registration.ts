import { registerRootStore, unregisterRootStore } from 'mobx-keystone';
import { useEffect } from 'react';

/**
 * A custom hook for managing the registration of a MobX root store.
 *
 * This hook registers a provided store as the MobX root store on mount and unregisters it on unmount.
 * It re-registers the store whenever the `store` dependency changes.
 *
 * @param {object | undefined} store - The MobX root store to be registered or unregistered.
 */
export const useMobxRootStoreRegistration = (store: object | undefined) => {
  useEffect(() => {
    if (store != null) {
      registerRootStore(store);
    }
    return () => {
      if (store != null) {
        unregisterRootStore(store);
      }
    };
  }, [store]);
};
