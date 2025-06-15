import { notNull, sleep } from '@freyja/kit/src';
import { reaction } from 'mobx';
import {
  createContext,
  getSnapshot,
  registerRootStore,
  SnapshotInOf,
  unregisterRootStore,
} from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { forwardRef, ForwardRefRenderFunction, PropsWithoutRef, useEffect } from 'react';
import { Client } from 'urql';

export const urqlClientCtx = createContext<Client>();

export const getUrqlClient = (node: object) =>
  notNull(urqlClientCtx.get(node), () => `urql client not set for ${node}`);

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

export const observerWithForwardRef = <P, T>(render: ForwardRefRenderFunction<T, PropsWithoutRef<P>>) =>
  observer(forwardRef<T, P>(render));

export class SnapshotSaver<S> {
  constructor(
    private userId: () => string,
    private throttleTime: number,
    private readonly saveSnapshot: (userId: string, snapshot: SnapshotInOf<S>) => Promise<void>
  ) {}

  private saving: { promise: Promise<void>; key: string } | undefined = undefined;
  private needSave: SnapshotInOf<S> | undefined = undefined;
  private lastSuccessSave = new Date();

  save(snapshot: SnapshotInOf<S>) {
    if (this.saving) {
      this.needSave = snapshot;
      return;
    }
    const key = Object.create(null);
    this.saving = {
      promise: (async () => {
        try {
          const now = new Date();
          const passed = +now - +this.lastSuccessSave;
          const needWait = this.throttleTime - passed;
          if (needWait > 0) {
            await sleep(needWait);
            if (key !== this.saving?.key) {
              return;
            }
          }
          await this.saveSnapshot(this.userId(), snapshot);
          if (key === this.saving?.key) {
            this.lastSuccessSave = new Date();
            this.saving = undefined;
            const { needSave } = this;
            if (needSave) {
              this.needSave = undefined;
              this.save(needSave);
            }
          }
        } catch (e) {
          console.error(`save error`, e);
          if (key === this.saving?.key) {
            await sleep(1000);
            if (key === this.saving?.key) {
              this.saving = undefined;
              const { needSave } = this;
              this.needSave = undefined;
              this.save(needSave ?? snapshot);
            }
          }
        }
      })(),
      key,
    };
  }

  reaction(node: S) {
    return reaction(
      () => getSnapshot(node),
      snapshot => this.save(snapshot)
    );
  }
}

export const disposable = (f: () => () => void): { init(): void; destroy(): void } => ({
  init() {
    this.destroy = f();
  },
  destroy: () => {
    throw new Error(`init didn't called`);
  },
});
