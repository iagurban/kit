import { CurrentUserJwtPayload } from '@focalm/server/modules/auth/auth.service';
import { createUsableContext } from '@freyja/kit-ui/react/react';
import { Model, model, prop, SnapshotInOf } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { useAuth } from './auth/useAuth';
import { dbPromise } from './database';
import { disposable } from './storage';
import { SnapshotSaver, useMobxRootStoreRegistration } from './utils/mobx-util';

@model(`focalm/LocalPreferences`)
export class LocalPreferences extends Model({
  blur: prop(false).withSetter(),
}) {
  readonly saver = new SnapshotSaver<LocalPreferences>(
    () => this.userId,
    1000,
    async (userId, snapshot) => {
      // console.log(`save snapshot`, snapshot);
      await (await dbPromise).put('localPreferences', { userId, json: snapshot });
    }
  );

  protected override onAttachedToRootStore() {
    const o = [disposable(() => this.saver.reaction(this))];

    o.forEach(o => o.init());
    return () => o.forEach(o => o.destroy());
  }

  private _userId: string | undefined = undefined;
  setUserId(userId: string) {
    this._userId = userId;
    return this;
  }

  get userId() {
    if (!this._userId) {
      throw new Error(`userId is not set`);
    }
    return this._userId;
  }
}

export const { use: useLocalPreferences, provider: LocalPreferencesProvider } =
  createUsableContext<LocalPreferences>(`focalm/focalm/LocalPreferences`);

const loadSnapshot = async (
  user: CurrentUserJwtPayload
): Promise<SnapshotInOf<LocalPreferences> | undefined> => {
  return (await (await dbPromise).getFromIndex('localPreferences', 'by-user', user.sub))?.json;
};

export const LocalPreferencesSource = observer<PropsWithChildren>(function LocalPreferencesSource({
  children,
}) {
  const user = useAuth();
  const [store, setStore] = useState<LocalPreferences>();
  const loading = useRef<{
    key: unknown;
    promise: Promise<SnapshotInOf<LocalPreferences> | undefined>;
  }>();

  useEffect(() => {
    if (!user) {
      return;
    }
    const key = Object.create(null);
    const startTime = +new Date();
    loading.current = {
      key,
      promise: loadSnapshot(user)
        .then(e => {
          if (key === loading.current?.key) {
            setStore(new LocalPreferences(e ?? {}).setUserId(user.sub));
          }
          return e;
        })
        .finally(() => {
          if (key === loading.current?.key) {
            loading.current = undefined;
            console.log(`timing:`, +new Date() - startTime);
          }
        }),
    };
  }, [user]);

  useMobxRootStoreRegistration(store);

  return store ? <LocalPreferencesProvider value={store}>{children}</LocalPreferencesProvider> : null;
});
