import { ApolloProvider, useApolloClient } from '@apollo/client/react';
import { AppShell, Box, Burger, Group, Skeleton, Typography } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { registerRootStore, unregisterRootStore } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useState } from 'react';

import { apolloClient } from './apollo';
import { ProvideRootStorage, useStorage } from './contexts.ts';
import { useGetCurrentUserQuery } from './graphql/queries.generated.tsx';
import { RootStorage } from './storage';

const RootView = observer(function RootView() {
  const { data } = useGetCurrentUserQuery();

  const storage = useStorage();

  return (
    <>
      <Typography>Main content {data?.dummyQuery}</Typography>
      <Box>
        {storage.chat.messagesLog.map(message => (
          <Typography>{message.message.nn}</Typography>
        ))}
      </Box>
    </>
  );
});

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
  const [opened, { toggle }] = useDisclosure();

  return (
    <ApolloProvider client={apolloClient}>
      <RootStoreProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <div>LOGO</div>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            Navbar
            {Array(15)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} h={28} mt="sm" animate={false} />
              ))}
          </AppShell.Navbar>

          <AppShell.Main>
            <RootView />
          </AppShell.Main>
        </AppShell>
      </RootStoreProvider>
    </ApolloProvider>
  );
});

export default App;
