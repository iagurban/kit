import { ApolloProvider, useApolloClient } from '@apollo/client/react';
import { Burger, Flex, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { registerRootStore, unregisterRootStore } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useState } from 'react';

import { apolloClient } from './apollo.ts';
import { ProvideRootStorage } from './contexts.ts';
import { NavbarView, RootView } from './root-view.tsx';
import { RootStorage } from './storage.ts';

const RootStoreProvider = observer<PropsWithChildren>(function RootStoreProvider({ children }) {
  const [storage, setStorage] = useState<RootStorage | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const storage = RootStorage.withArgs({}, { client });
    registerRootStore(storage);
    setStorage(storage);
    return () => {
      unregisterRootStore(storage);
    };
  }, [client]);
  return storage ? <ProvideRootStorage value={storage}>{children}</ProvideRootStorage> : null;
});

const App = observer(function App() {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <ApolloProvider client={apolloClient}>
      <RootStoreProvider>
        <Flex component="header" pos="fixed" w="100%" h="4rem" left={0} top={0}>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} size="sm" />
            <div>LOGO</div>
          </Group>
        </Flex>

        <Flex w="100vw">
          <Flex component="nav" p="md" pt="4rem" mih="100vh" w={opened ? 200 : 0}>
            <NavbarView />
          </Flex>

          <Flex component="main" mih="100vh" p="md" pt="4rem" flex="1 0 0">
            <RootView />
          </Flex>
        </Flex>
      </RootStoreProvider>
    </ApolloProvider>
  );
});

export default App;
