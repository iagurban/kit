import { once } from '@freyja/kit/core/once';
import { ActionIcon, AppShell, Box, Burger, Flex, Popover, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconRefresh, IconSettings } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';

import { CardsStack } from './editing/cards-stack';
import { TasksListView } from './list/tasks-list-view';
import { LocalPreferencesSource, useLocalPreferences } from './local-preferences';
import { AnimationConfigProvider, ProvideDatesFormats } from './utils/react-contexts';

const ConfigButton = observer(function ConfigButton() {
  const preferences = useLocalPreferences();

  return (
    <Popover>
      <Popover.Target>
        <ActionIcon>
          <IconSettings />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Box>
          <Switch
            label="Blur background"
            checked={preferences.blur}
            onChange={e => preferences.setBlur(e.currentTarget.checked)}
          />
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
});

export const RootContentView = observer(function RootContentView() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <LocalPreferencesSource>
      <AnimationConfigProvider
        value={{
          timeMs: 250,
          get transitionAllEaseFull() {
            return once(this, `transitionAllEaseFull`, true, this.transitionAllEase(this.timeMs));
          },
          transitionAllEase(timeMs) {
            return `all ${timeMs}ms ease`;
          },
        }}
      >
        <AppShell
          header={{ height: 32 }}
          navbar={{
            width: 100,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header>
            <Flex>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <div>Logo</div>
              <Box flex="1 0 0" />
              <ActionIcon>
                <IconRefresh />
              </ActionIcon>

              <ConfigButton />
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

          <AppShell.Main>
            <ProvideDatesFormats value={{ dateFormat: `DD.MM.YYYY`, timeFormat: `HH:mm` }}>
              <TasksListView />
              <CardsStack />
            </ProvideDatesFormats>
          </AppShell.Main>
        </AppShell>
      </AnimationConfigProvider>
    </LocalPreferencesSource>
  );
});
