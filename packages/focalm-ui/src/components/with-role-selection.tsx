import { NavLink, Popover, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Fuse from 'fuse.js';
import { observer } from 'mobx-react-lite';
import { ReactNode, useMemo, useState } from 'react';

import { useGetParticipantsRolesQuery } from '../graphql.generated/tasks';
import { mantinePopoverShadow } from '../shared/const';
import { PRole } from '../storage/task-card-store';

export const WithRoleSelection = observer<{
  onSelected: (role: PRole) => void;
  renderTarget: (open: () => void) => ReactNode;
  dropdownPortal?: HTMLDivElement;
}>(function WithUserSelection({ onSelected, renderTarget, dropdownPortal }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState(``);

  const [data] = useGetParticipantsRolesQuery();

  const fuse = useMemo(
    () => (data.data ? new Fuse(data.data.participantsRoles, { keys: [`name`] }) : null),
    [data]
  );

  const list = useMemo(
    () => (search && fuse ? fuse.search(search).map(r => r.item) : data.data?.participantsRoles || []),
    [fuse, search]
  );

  return (
    <Popover
      opened={opened}
      onDismiss={close}
      shadow={mantinePopoverShadow}
      withArrow
      portalProps={{ target: dropdownPortal }}
    >
      <Popover.Target>{renderTarget(open)}</Popover.Target>
      <Popover.Dropdown p={0}>
        <TextInput placeholder="Search..." value={search} onChange={e => setSearch(e.currentTarget.value)} />
        {list.map(r => (
          <NavLink
            key={r.id}
            label={r.name}
            onClick={() => {
              close();
              onSelected(r);
            }}
          />
        ))}
      </Popover.Dropdown>
    </Popover>
  );
});
