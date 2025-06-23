import { ActionIcon, Box, Burger, Flex, Image, NavLink, Popover, Switch } from '@mantine/core';
import { IconRefresh, IconSettings } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';

import { useAuth } from '../auth/useAuth';
import logoImage from '../images/logo-big.png';
import { useLocalPreferences } from '../providers/local-preferences';
import { useStorage } from '../storage/storage';

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

export const ShellHeader = observer<{
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
