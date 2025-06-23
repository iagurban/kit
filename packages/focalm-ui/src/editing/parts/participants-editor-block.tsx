import { emptySymbol } from '@gurban/kit/core/string-const';
import { Nullish } from '@gurban/kit/utils/types';
import {
  ActionIcon,
  Avatar,
  Badge,
  Divider,
  Flex,
  Loader,
  MantineColor,
  NavLink,
  Popover,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconConePlus, IconPlus, IconTrash, IconUserPlus, IconX } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, ReactNode, useRef } from 'react';

import { useAuth } from '../../auth/useAuth';
import { NoItems } from '../../components/no-items';
import { WithRoleSelection } from '../../components/with-role-selection';
import { WithUserSelection } from '../../components/with-user-selection';
import { dangerColorMantine, mantinePopoverShadow } from '../../shared/const';
import { useStorage } from '../../storage/storage';
import { TaskCardStore } from '../../storage/task-card-store';
import { observerWithForwardRef } from '../../utils/mobx-util';
import { UserLink, UserRenderer } from './user-renderer';

const RolesBadges = observer<{
  card: TaskCardStore;
  participant: Exclude<TaskCardStore[`actual`][`participants`], Nullish>[number];
  dropdownPortal?: HTMLDivElement;
}>(function RolesBadges({ card, participant: p, dropdownPortal }) {
  return (
    <Flex direction="column" gap="0.2rem" align="end">
      {p.tags?.map(t => (
        <Badge
          key={t.role.id}
          rightSection={<IconX size="1rem" onClick={() => card.removeUserTag(p.userId, t.role)} />}
          color={t.role.color}
          autoContrast
        >
          {t.role.name}
        </Badge>
      ))}
      <WithRoleSelection
        dropdownPortal={dropdownPortal}
        onSelected={tag => card.addUserTag(p.userId, tag)}
        renderTarget={open => (
          <Badge variant="outline" onClick={open} leftSection={<IconPlus size="1rem" />}>
            Role
          </Badge>
        )}
      />
    </Flex>
  );
});

const ParticipantRow = observer<{
  card: TaskCardStore;
  participant: Exclude<TaskCardStore[`actual`][`participants`], Nullish>[number];
  dropdownPortal?: HTMLDivElement;
}>(function ParticipantRow({ card, participant: p, dropdownPortal }) {
  return (
    <Flex align="center">
      <UserRenderer
        userId={p.userId}
        render={u =>
          u === `loading` ? (
            <Loader />
          ) : (
            u && (
              <UserLink
                name={u.name}
                email={u.email}
                rightSection={
                  <Flex gap="xs" align="center">
                    <RolesBadges card={card} participant={p} dropdownPortal={dropdownPortal} />

                    <ActionIcon
                      onClick={() => card.removeUser(p.userId)}
                      color={dangerColorMantine}
                      variant="outline"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Flex>
                }
              />
            )
          )
        }
      />
    </Flex>
  );
});

const ParticipantsEditor = observer<{
  card: TaskCardStore;
}>(function ParticipantsEditor({ card }) {
  const user = useAuth();
  const storage = useStorage();

  const dropdownPortalRef = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="column" miw="50vw" align="stretch">
      <Flex ref={dropdownPortalRef} />
      <Flex direction="column">
        {!card.actual.participants?.find(f => f.userId === user?.sub) && (
          <NavLink
            label="Add myself"
            variant="subtle"
            leftSection={<IconConePlus size="1rem" />}
            onClick={() => user && card.addUser(user.sub)}
          />
        )}
        <WithUserSelection
          card={card}
          renderTarget={open => (
            <NavLink
              label="Add user..."
              variant="subtle"
              leftSection={<IconUserPlus size="1rem" />}
              onClick={open}
            />
          )}
          onSelected={u => {
            storage.tasks.onUsersUpdated([u]);
            card.addUser(u.id);
          }}
        />
        <Divider />
      </Flex>
      <ScrollArea.Autosize type="always" scrollbars="y" mah="50vh" miw="30rem">
        <Flex direction="column">
          {card.actual.participants?.length ? (
            card.actual.participants.map(p => (
              <ParticipantRow
                key={p.userId}
                participant={p}
                card={card}
                dropdownPortal={dropdownPortalRef.current ?? undefined}
              />
            ))
          ) : (
            <NoItems>No participants</NoItems>
          )}
        </Flex>
      </ScrollArea.Autosize>
    </Flex>
  );
});

const GroupingBadge = observerWithForwardRef<
  PropsWithChildren<{
    rightSection: ReactNode;
    onClick?: () => void;
    c?: MantineColor;
  }>,
  HTMLDivElement
>(function GroupingBadge({ rightSection, onClick, c, children }, ref) {
  return (
    <Badge
      ref={ref}
      variant="light"
      size="md"
      style={{
        '--badge-padding-x': `0.2rem`,
        '--badge-height': `2rem`,
        textTransform: `none`,
        paddingLeft: `0.5rem`,
      }}
      color={c}
      autoContrast
      rightSection={rightSection}
      onClick={onClick}
    >
      {children}
    </Badge>
  );
});

export const ParticipantsEditorBlock = observer<{
  card: TaskCardStore;
}>(function ParticipantsEditorBlock({ card }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex>
      <GroupingBadge
        c="orange.7"
        rightSection={
          <UserRenderer
            userId={card.actual.responsibleId || null}
            render={u =>
              u === `loading` ? (
                <Loader />
              ) : (
                <Avatar size="1.9rem" color="dimmed">
                  {u?.abbrev || `???`}
                </Avatar>
              )
            }
          />
        }
      >
        Responsible
      </GroupingBadge>
      <Popover
        shadow={mantinePopoverShadow}
        withArrow
        middlewares={{ size: true }}
        onDismiss={close}
        opened={opened}
      >
        <Popover.Target>
          <GroupingBadge
            onClick={open}
            c="green.9"
            rightSection={
              <Avatar.Group>
                {card.actual.participants?.length ? (
                  card.actual.participants.map(p => (
                    <UserRenderer
                      key={p.userId}
                      userId={p.userId}
                      render={u => <Avatar size="1.9rem">{u === `loading` ? <Loader /> : u?.abbrev}</Avatar>}
                    />
                  ))
                ) : (
                  <Avatar>{emptySymbol}</Avatar>
                )}
              </Avatar.Group>
            }
          >
            Participants
          </GroupingBadge>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <ParticipantsEditor card={card} />
        </Popover.Dropdown>
      </Popover>
    </Flex>
  );
});
