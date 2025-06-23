import { Badge, Loader, NavLink } from '@mantine/core';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ReactNode, useMemo } from 'react';

import { useStorage } from '../../storage/storage';
import { UserBrief } from '../../storage/task-card-store';

export const UserRenderer = observer<{
  userId: string | null;
  render: (user: UserBrief | `loading` | null) => ReactNode;
}>(function UserRenderer({ userId, render }) {
  const storage = useStorage();
  const user = useMemo(
    () => computed(() => (userId ? storage.tasks.getUser(userId) : null)),
    [storage, userId]
  ).get();
  return render(user);
});

export const UserButton = observer<{
  userId: string | null;
}>(function UserButton({ userId }) {
  const storage = useStorage();
  const user = useMemo(
    () => computed(() => (userId ? storage.tasks.getUser(userId) : null)),
    [storage, userId]
  ).get();
  return (
    <Badge size="lg" color="white" autoContrast autoCapitalize="off">
      {user === `loading` ? <Loader size="sm" /> : user ? user.email : `<unknown>`}
    </Badge>
  );
});

export const UserLink = observer<{
  name: string;
  email: string;
  rightSection?: ReactNode;
  onClick?: () => void;
}>(function UserLink({ name, email, rightSection, onClick }) {
  return (
    <NavLink component="div" label={name} description={email} onClick={onClick} rightSection={rightSection} />
  );
});
