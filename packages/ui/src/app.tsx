import '@mantine/dropzone/styles.css';

import { uidGenerator } from '@freyja/kit';
import { Box, MantineProvider, Modal } from '@mantine/core';
// import { ProvideTilesManager } from './util/tiles-pattern-svg';
import { setGlobalConfig } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';
import { useClient } from 'urql';

import { useAuth } from './auth/useAuth';
import { LoginForm } from './login-form';
import { MenuView } from './menu/menu-view';
import { MenuEditingContextProvider, MenuEditingStore } from './menu/stores/menu-editing-store';
// import { ArrowsSymbolDefs } from './parts/arrows-symbol-defs.tsx';
// import { RootViewContent } from './root-view-content.tsx';
// import { loadFromLocalstorageSnapshot, RootStore, RootStoreProvider, startSavingSnapshot } from './storage';
import { theme } from './theme';
import { tokenStore, UrqlProvider } from './urql-provider';

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

  const rootStore = useMemo(() => new MenuEditingStore(client), [client]);

  useEffect(() => {
    rootStore.init();
    return () => rootStore.destroy();
  }, [rootStore]);

  // useEffect(() => {
  //   if (q.data?.menu.id && selectedMenuID == null) {
  //     setSelectedMenuID(q.data.menu.id);
  //   }
  // }, [q.data?.menu, selectedMenuID]);

  return tokenStore.initialized ? (
    <MenuEditingContextProvider value={rootStore}>
      <Box w={`100vw`} style={{ minHeight: `100vh` }} bg={`gray.0`}>
        <Modal opened={!user} onClose={() => undefined}>
          <LoginForm />
        </Modal>
        {user && <MenuView />}
      </Box>
    </MenuEditingContextProvider>
  ) : null;
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
