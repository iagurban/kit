import { Box, Divider, Flex, NavLink } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { useAuth } from '../auth/useAuth';
import { useEditingTreeContext } from './stores/menu-editing-store';

export const SidePanel = observer(function SidePanel() {
  const user = useAuth();
  const ctx = useEditingTreeContext();
  return (
    <Flex w="calc(130px + 10vw)" bg="gray.3" gap="xs" p="xs" direction="column">
      <Box>
        <Box>{user?.name || `loading...`}</Box>
        <Box>{user?.email || `loading...`}</Box>
      </Box>
      <Divider color="gray.5" />
      {ctx.menu.menuRequest.result?.data?.availableMenus?.map(m => (
        <NavLink key={m.id} label={m.title} active={ctx.selectedMenuID === m.id} />
      ))}
    </Flex>
  );
});
