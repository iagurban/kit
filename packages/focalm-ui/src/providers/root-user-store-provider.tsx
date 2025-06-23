import { notNull } from '@gurban/kit/utils/flow-utils';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useMemo } from 'react';
import { useClient } from 'urql';

import { useAuth } from '../auth/useAuth';
import { RootStorage, StorageProvider } from '../storage/storage';
import { useMobxRootStoreRegistration } from '../utils/mobx-util';

export const RootUserStoreProvider = observer<PropsWithChildren>(function RootUserStoreProvider({
  children,
}) {
  const user = notNull(useAuth());
  const client = useClient();
  const rootStore = useMemo(() => new RootStorage({}).setUrqlClient(client).setUser(user), [client, user]);
  useMobxRootStoreRegistration(rootStore);

  return <StorageProvider value={rootStore}>{children}</StorageProvider>;
});
