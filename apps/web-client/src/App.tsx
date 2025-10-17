import { ApolloProvider } from '@apollo/client/react';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';

import { apolloClient } from './apollo';
import { useGetCurrentUserQuery } from './graphql/queries.generated.tsx';

const RootView = observer(function RootView() {
  const { data } = useGetCurrentUserQuery();

  return <> Main content {data?.dummyQuery}</>;
});

const App = observer(function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );
});

export default App;
