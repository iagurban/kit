import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';

import { uidGenerator } from '@freyja/kit/src';
import { Box, MantineProvider, Modal } from '@mantine/core';
// import { ProvideTilesManager } from './util/tiles-pattern-svg';
import { setGlobalConfig } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { FC, useMemo } from 'react';
import { useClient } from 'urql';

import { useAuth } from './auth/useAuth';
import { LoginForm } from './login-form';
import { useMobxRootStoreRegistration } from './mobx-util';
import { RootContentView } from './root-content-view';
import { Storage, StorageProvider } from './storage';
// import { ArrowsSymbolDefs } from './parts/arrows-symbol-defs.tsx';
// import { RootViewContent } from './root-view-content.tsx';
// import { loadFromLocalstorageSnapshot, RootStore, RootStoreProvider, startSavingSnapshot } from './storage';
import { theme } from './theme';
import { UrqlProvider } from './urql-provider';

setGlobalConfig({ modelIdGenerator: uidGenerator });

// const RootView = observer(function RootView() {
//   return (
//     <ProvideTilesManager>
//       <ArrowsSymbolDefs />
//
//       <RootViewContent />
//     </ProvideTilesManager>
//   );
// });

const RootView = observer(function RootView() {
  const user = useAuth();
  console.log(`user`, user);

  const client = useClient();

  const rootStore = useMemo(() => new Storage({}).setUrqlClient(client), [client]);

  useMobxRootStoreRegistration(rootStore);

  // useEffect(() => {
  //   if (q.data?.menu.id && selectedMenuID == null) {
  //     setSelectedMenuID(q.data.menu.id);
  //   }
  // }, [q.data?.menu, selectedMenuID]);

  return (
    <StorageProvider value={rootStore}>
      <Box w={`100vw`} style={{ minHeight: `100vh` }} bg={`gray.0`}>
        <Modal opened={!user} onClose={() => undefined}>
          <LoginForm />
        </Modal>

        {user && <RootContentView />}
      </Box>
    </StorageProvider>
  );
});

export const App: FC = () => {
  // const [rootStore, setRootStore] = useState<RootStore>();
  //
  // useEffect(() => {
  //   const store = loadFromLocalstorageSnapshot();
  //   registerRootStore(store);
  //
  //   const unsub = startSavingSnapshot(store, `srpski-tables-dev`);
  //
  //   setRootStore(store);
  //   return () => {
  //     setRootStore(undefined);
  //     unsub();
  //     unregisterRootStore(store);
  //   };
  // }, []);

  return (
    <MantineProvider theme={theme}>
      <UrqlProvider>
        {/*<RootStoreProvider value={rootStore}>*/}
        {/* <CssBaseline /> */}
        <RootView />
        {/*</RootStoreProvider>*/}
      </UrqlProvider>
    </MantineProvider>
  );
};
