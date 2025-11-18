import { registerRootStore, unregisterRootStore } from 'mobx-keystone';
import { useEffect } from 'react';

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
