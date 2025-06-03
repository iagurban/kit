import { notNull } from '@freyja/kit/src';
import { createContext, registerRootStore, unregisterRootStore } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { forwardRef, ForwardRefRenderFunction, PropsWithoutRef, useEffect } from 'react';
import { Client } from 'urql';

export const urqlClientCtx = createContext<Client>();

export const getUrqlClient = (node: object) =>
  notNull(urqlClientCtx.get(node), () => `urql client not set for ${node}`);

export const useMobxRootStoreRegistration = (store: object) => {
  useEffect(() => {
    registerRootStore(store);
    return () => {
      unregisterRootStore(store);
    };
  }, [store]);
};

export const observerWithForwardRef = <P, T>(render: ForwardRefRenderFunction<T, PropsWithoutRef<P>>) =>
  observer(forwardRef<T, P>(render));
