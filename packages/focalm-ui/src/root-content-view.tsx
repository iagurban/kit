import { isTruthy } from '@freyja/kit/asserts';
import { once } from '@freyja/kit/core/once';
import { ActionIcon, AppShell, Box, Burger, Flex, Image, NavLink, Popover, Switch } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconRefresh, IconSettings } from '@tabler/icons-react';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CSSProperties, useMemo } from 'react';

import { useAuth } from './auth/useAuth';
import { CardsStack } from './editing/cards-stack';
import logoImage from './images/logo-big.png';
import { TasksListView } from './list/tasks-list-view';
import { LocalPreferencesSource, useLocalPreferences } from './local-preferences';
import { backgrounds } from './parabg/backgrounds';
import parabgCN from './parabg/parabg.module.scss';
import { getParabgKeyframes } from './parabg/testing-view/parabg-sample-view';
import { useStorage } from './storage';
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

const ShellHeader = observer<{
  opened: boolean;
  toggle: () => void;
}>(function ShellHeader({ opened, toggle }) {
  const storage = useStorage();
  const user = useAuth();

  return (
    <Flex h="100%" px="sm" align="center" gap="xs">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Image src={logoImage} h="100%" w="auto" flex="0 0 auto" style={{ objectFit: `contain` }} />
      <Box flex="1 0 0" />

      <NavLink label={user?.email} w="auto" />

      <ActionIcon loading={storage.tasks.loadRequest.loading || storage.tasks.saveRequest.loading}>
        <IconRefresh />
      </ActionIcon>

      <ConfigButton />
    </Flex>
  );
});

const ShellNavbar = observer(function ShellNavbar() {
  return (
    <Flex direction="column">
      <NavLink label="Personal" active />
    </Flex>
  );
});

const rootParabgScale = 4;

const provideParabgCssVars = (
  name: string,
  bg: string,
  scale: number,
  duration: string,
  other: Pick<CSSProperties, `animationDirection` | `animationTimingFunction` | `animationFillMode`> = {}
) =>
  Object.assign(
    {
      '--parabg-duration': duration,
      '--parabg-animation-name': name,
      '--parabg-background': bg,
      '--parabg-scale': scale,
    },
    Object.fromEntries(
      [
        other.animationDirection && ['--parabg-animation-direction', other.animationDirection],
        other.animationTimingFunction && ['--parabg-timing-function', other.animationTimingFunction],
        other.animationFillMode && ['--parabg-fill-mode', other.animationFillMode],
      ].filter(isTruthy)
    ) as Partial<{
      '--parabg-animation-direction': CSSProperties[`animationDirection`];
      '--parabg-timing-function': CSSProperties['animationTimingFunction'];
      '--parabg-fill-mode': CSSProperties['animationFillMode'];
    }>
  );

export const RootContentView = observer(function RootContentView() {
  const [opened, { toggle }] = useDisclosure();

  const parabgKeyframes = useMemo(() => computed(() => getParabgKeyframes(`rectJumpy`, rootParabgScale)), []);

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
          header={{ height: '3rem' }}
          navbar={{
            width: `8rem`,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding="md"
          classNames={{ root: parabgCN.withParabg }}
          styles={{
            navbar: { background: `none` },
            header: { background: `none` },
            root: provideParabgCssVars(
              parabgKeyframes.get().get(),
              backgrounds.calm,
              rootParabgScale,
              `160s`
            ),
          }}
        >
          <AppShell.Header p={0} m={0}>
            <ShellHeader opened={opened} toggle={toggle} />
          </AppShell.Header>

          <AppShell.Navbar styles={{ navbar: { padding: 0 } }}>
            <ShellNavbar />
          </AppShell.Navbar>

          <AppShell.Main pos="relative">
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
