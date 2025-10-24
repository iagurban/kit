import { errorToString } from '@gurban/kit/utils/error-utils.ts';
import { notNull } from '@gurban/kit/utils/flow-utils.ts';
import { Box, Button, Flex, TextInput, Typography } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { computed, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Fragment, useEffect, useMemo } from 'react';

import { useStorage } from './contexts.ts';
import { useGetCurrentUserQuery } from './graphql/queries.generated.tsx';

const MessageInputBlock = observer(function MessageInputBlock() {
  const storge = useStorage();

  const draft = useMemo(
    () =>
      computed(() => {
        const key = storge.chats.selectedChatId?.maybeCurrent?.id;
        return (key && storge.chats.messagesDrafts.get(key)) || undefined;
      }),
    [storge]
  );

  const getOrCreate = useMemo(
    () => () => storge.chats.getOrCreateDraft(notNull(storge.chats.selectedChatId?.maybeCurrent?.id)),
    [storge]
  );

  useEffect(
    () =>
      reaction(
        () => JSON.stringify(toJS(draft.get())),
        draft => {
          console.log('draft changed', draft);
        }
      ),
    [storge, draft]
  );

  return (
    <Flex gap="1rem" align="center">
      <Flex flex="1 0 0" direction="column" gap="md" align="stretch" justify="stretch">
        <TextInput
          width="100%"
          value={draft?.get()?.text ?? ''}
          onChange={e => getOrCreate().setText(e.target.value)}
        />
      </Flex>
      <Button size="compact-md">
        <IconSend />
      </Button>
    </Flex>
  );
});

const CurrentChatView = observer(function CurrentChatView() {
  const storage = useStorage();

  const current = useMemo(() => computed(() => storage.chats.selectedChatId?.maybeCurrent), [storage]).get();
  return current ? (
    <Flex direction="column" flex="1 0 0" justify="space-between">
      <Box>
        {storage.chats.messagesLog.map(message => (
          <Typography>{message.message.nn}</Typography>
        ))}
      </Box>
      <MessageInputBlock />
    </Flex>
  ) : (
    <>
      <Typography>Select the chat</Typography>
    </>
  );
});

export const RootView = observer(function RootView() {
  const { data } = useGetCurrentUserQuery();

  const storage = useStorage();

  return (
    <Flex direction="column" gap="md" align="stretch" justify="stretch" w="100%">
      <Typography>
        {storage.chats.selectedChatId?.current.title} {data?.dummyQuery}
      </Typography>
      <CurrentChatView />
    </Flex>
  );
});

export const NavbarView = observer(function NavbarView() {
  const storage = useStorage();
  return (
    <>
      {storage.chats.loadingError && (
        <Typography c="red">{errorToString(storage.chats.loadingError)}</Typography>
      )}
      {[...storage.chats.chats.entries()].map(([id, chat]) => (
        <Fragment key={id}>
          <Typography>
            {id} {chat.title}
          </Typography>
        </Fragment>
      ))}
    </>
  );
});
