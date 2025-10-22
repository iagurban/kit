import { ApolloProvider, useApolloClient } from '@apollo/client/react';
import { AppShell, Box, Burger, Flex, Group, TextInput, Typography } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { registerRootStore, unregisterRootStore } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { Fragment, PropsWithChildren, useEffect, useState } from 'react';

import { apolloClient } from './apollo';
import { ProvideRootStorage, useStorage } from './contexts.ts';
import { useGetCurrentUserQuery } from './graphql/queries.generated.tsx';
import { RootStorage } from './storage';

const RootView = observer(function RootView() {
  const { data } = useGetCurrentUserQuery();

  const storage = useStorage();

  return (
    <Flex direction="column" gap="md" align="stretch" justify="stretch" h="100%" w="100%" p="md">
      <Typography>
        {storage.chat.selectedChatId?.current.title} {data?.dummyQuery}
      </Typography>
      <Flex flex="1 0 0">
        <Box>
          {storage.chat.messagesLog.map(message => (
            <Typography>{message.message.nn}</Typography>
          ))}
        </Box>
      </Flex>
      <Box>
        <TextInput />
      </Box>
    </Flex>
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

const errorToString = (error: unknown) => (error instanceof Error ? error.message : String(error));

const NavbarView = observer(function NavbarView() {
  const storage = useStorage();
  return (
    <>
      {storage.chat.loadingError && (
        <Typography c="red">{errorToString(storage.chat.loadingError)}</Typography>
      )}
      {[...storage.chat.chats.entries()].map(([id, chat]) => (
        <Fragment key={id}>
          <Typography>
            {id} {chat.title}
          </Typography>
        </Fragment>
      ))}
    </>
  );
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
            <NavbarView />
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
