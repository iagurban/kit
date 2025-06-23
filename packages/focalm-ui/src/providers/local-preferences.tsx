import { CurrentUserJwtPayload } from '@focalm/server/modules/auth/auth.service';
import { createUsableContext } from '@freyja/kit-ui/react/react';
import { Model, model, prop, SnapshotInOf } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { navigatorDetector } from 'typesafe-i18n/detectors';

import { useAuth } from '../auth/useAuth';
import { detectLocale } from '../i18n/_i18n-util';
import { loadLocaleAsync } from '../i18n/_i18n-util.async';
import TypesafeI18n from '../i18n/i18n-react';
import { idbClient } from '../shared/database';
import { disposable, SnapshotSaver, useMobxRootStoreRegistration } from '../utils/mobx-util';

@model(`focalm/LocalPreferences`)
export class LocalPreferences extends Model({
  blur: prop(false).withSetter(),
}) {
  readonly saver = new SnapshotSaver<LocalPreferences>(
    () => this.userId,
    1000,
    async (userId, snapshot) => {
      // console.log(`save snapshot`, snapshot);
      await (await idbClient).put('localPreferences', { userId, json: snapshot });
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
  return (await (await idbClient).getFromIndex('localPreferences', 'by-user', user.sub))?.json;
};

export const LocalePreferencesSource = observer<PropsWithChildren>(function LocalePreferencesSource({
  children,
}) {
  const user = useAuth();

  // Detect locale
  // (Use as advanaced locale detection strategy as you like.
  // More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
  const locale = detectLocale(navigatorDetector);

  // Load locales
  // (Use a data fetching solution that you prefer)
  const [localesLoaded, setLocalesLoaded] = useState(false);
  useEffect(() => {
    loadLocaleAsync(locale).then(() => setLocalesLoaded(true));
  }, [locale]);

  // Load LocalPreferences
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

  return store && localesLoaded ? (
    <TypesafeI18n locale={locale}>
      <LocalPreferencesProvider value={store}>{children}</LocalPreferencesProvider>
    </TypesafeI18n>
  ) : null;
});
