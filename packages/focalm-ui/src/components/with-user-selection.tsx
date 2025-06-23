import { Avatar, Box, Flex, NavLink, Popover, ScrollArea, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Fuse from 'fuse.js';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ReactNode, useMemo, useState } from 'react';

import { useGetUsersQuery } from '../graphql.generated/tasks';
import { mantinePopoverShadow } from '../shared/const';
import { TaskCardStore, UserBrief } from '../storage/task-card-store';

export const WithUserSelection = observer<{
  onSelected: (u: UserBrief) => void;
  renderTarget: (open: () => void) => ReactNode;
  card: TaskCardStore;
}>(function WithUserSelection({ card, onSelected, renderTarget }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState(``);

  const [data] = useGetUsersQuery();

  const added = useMemo(
    () => computed(() => new Set(card.actual.participants?.map(p => p.userId)) || []),
    []
  ).get();

  const fuse = useMemo(() => {
    const users = data.data?.users.filter(u => !added.has(u.id));
    if (!users) {
      return {
        search() {
          return [];
        },
      };
    }
    return new Fuse(users, { keys: [`name`, `email`] });
  }, [data, added]);

  const list = useMemo(
    () => (search && fuse ? fuse.search(search).map(r => r.item) : data.data?.users || []),
    [fuse, search, data]
  );

  return (
    <Popover
      opened={opened}
      onDismiss={close}
      middlewares={{ size: { elementContext: `floating` } }}
      withArrow
      shadow={mantinePopoverShadow}
      trapFocus
      withinPortal={false}
    >
      <Popover.Target>{renderTarget(open)}</Popover.Target>
      <Popover.Dropdown p={0}>
        <Flex direction="column">
          <Flex direction="column" p="xs">
            <TextInput
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.currentTarget.value)}
            />
          </Flex>

          <ScrollArea.Autosize type="always" scrollbars="y" mah="max(50vh,30rem)" miw="30rem" maw="30rem">
            <Box>
              {list.length ? (
                list.map(u => (
                  <NavLink
                    key={u.id}
                    onClick={() => {
                      close();
                      onSelected(u);
                    }}
                    label={u.name}
                    description={u.email}
                    leftSection={<Avatar>{u.abbrev}</Avatar>}
                  ></NavLink>
                ))
              ) : (
                <Text>No users available</Text>
              )}
            </Box>
          </ScrollArea.Autosize>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
});
