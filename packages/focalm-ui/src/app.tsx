import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import '@gfazioli/mantine-parallax/styles.css';

import { uidGenerator } from '@freyja/kit/src';
import { Box, MantineProvider, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { setGlobalConfig } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { FC, PropsWithChildren, useMemo } from 'react';
import { useClient } from 'urql';
import { registerSW } from 'virtual:pwa-register';

import { useAuth } from './auth/useAuth';
import { LoginForm } from './login-form';
import { ParabgTesing } from './parabg/testing-view/parabg-tesing';
import { RootContentView } from './root-content-view';
import { Storage, StorageProvider } from './storage';
import { theme } from './theme';
import { UrqlProvider } from './urql-provider';
import { useMobxRootStoreRegistration } from './utils/mobx-util';

setGlobalConfig({ modelIdGenerator: uidGenerator });
// import minMax from 'dayjs/plugin/minMax' // ES 2015

dayjs.extend(minMax);

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available, reload now?')) {
      void updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline!');
  },
});

// const RootView = observer(function RootView() {
//   return (
//     <ProvideTilesManager>
//       <ArrowsSymbolDefs />
//
//       <RootViewContent />
//     </ProvideTilesManager>
//   );
// });

const RootUserStoreProvider = observer<PropsWithChildren>(function RootUserStoreProvider({ children }) {
  const client = useClient();
  const rootStore = useMemo(() => new Storage({}).setUrqlClient(client), [client]);
  useMobxRootStoreRegistration(rootStore);

  return <StorageProvider value={rootStore}>{children}</StorageProvider>;
});

const RootView = observer(function RootView() {
  const user = useAuth();
  console.log(`user`, user);

  const [anibgOpened, { close: closeAnibg }] = useDisclosure(false);

  return (
    <Box w={`100vw`} style={{ minHeight: `100vh` }} bg={`gray.0`}>
      <Modal
        opened={anibgOpened}
        onClose={closeAnibg}
        fullScreen
        styles={{ content: { display: `flex`, flexDirection: `column` }, body: { flex: `1 0 auto` } }}
      >
        <ParabgTesing />
      </Modal>
      <Modal opened={!user} onClose={() => undefined}>
        <LoginForm />
      </Modal>
      {user && (
        <RootUserStoreProvider>
          <RootContentView />
        </RootUserStoreProvider>
      )}
    </Box>
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
