import { ExMap } from '@freyja/kit/collections/ex-map';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Loader,
  Overlay,
  Paper,
  Popover,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconRestore, IconTrash, IconX } from '@tabler/icons-react';
import { sortBy } from 'lodash';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CSSProperties, PropsWithChildren, ReactNode, useMemo, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';

import { TaskCardStore, useStorage } from '../storage';
import { useAnimationConfig } from '../utils/react-contexts';
import { DateTimeEditableInput } from './date-time-editable-input';
import { DateTimeSelectorProps } from './date-time-selector';
import { PrioritizingInput } from './prioritizing-input';
import { TitleInput } from './title-input';
import close = Simulate.close;

const TaskFieldFormItem = observer<PropsWithChildren>(function TaskFieldFormItem({ children }) {
  return (
    <Flex direction="column">
      <Flex direction="column" px="sm">
        {children}
      </Flex>
      <Divider my="xs" />
    </Flex>
  );
});

const DateTimeEditableItem = observer<
  DateTimeSelectorProps & {
    title: string;
  }
>(function DateTimeEditableItem({ title, ...props }) {
  return (
    <Flex align="baseline" justify="space-between" py="2">
      <Box>{title}</Box>
      <DateTimeEditableInput {...props} />
    </Flex>
  );
});

const ProgressLabel = observer<{
  value: number;
  label: string;
}>(function ProgressLabel({ value, label }) {
  return (
    <Box pos="relative">
      <Box w={`${value * 100}%`} pos="absolute" h="100%" style={{ zIndex: -1 }}>
        <Box pos="absolute" left={4} top={4} bottom={4} right={4} style={{ borderRadius: 4 }} bg="blue.5" />
      </Box>
      <Box style={{ zIndex: 100 }}>{label}</Box>
    </Box>
  );
});

const UserButton = observer<{
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

const TaskEditContent = observer<{
  card: TaskCardStore;
  isLast: boolean;
  hasChanges: boolean;
}>(function TaskEditContent({ card, isLast, hasChanges }) {
  const storage = useStorage();

  const { transitionAllEaseFull } = useAnimationConfig();

  return (
    <Paper
      radius="md"
      styles={{ root: { padding: 0, overflow: `hidden`, width: `100%` } }}
      pos="relative"
      shadow="xs"
    >
      <Flex
        bg={dangerColorMantine}
        pos="absolute"
        left={0}
        top={0}
        right={0}
        h="0.3rem"
        style={{ opacity: hasChanges ? 1 : 0, transition: transitionAllEaseFull }}
      />

      <Flex direction="column" pt="xs">
        <Overlay
          pos="absolute"
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 1rem, rgba(0, 0, 0, 0.4) 3rem, rgba(0, 0, 0, 0.5) 100%)"
          onClick={() => {
            storage.tasks.revealCard(card.id);
          }}
          // style={{ '--overlay-z-index': 100 }}
          blur={0.001}
          style={{
            transition: transitionAllEaseFull,
            opacity: isLast ? 0 : 1,
            pointerEvents: isLast ? `none` : `all`,
          }}
        />

        <TaskFieldFormItem>
          <TitleInput
            value={card.actual.title || ``}
            onChange={value => card.setStringValue(`title`, value)}
          />
        </TaskFieldFormItem>
        <TaskFieldFormItem>
          <Flex>
            <PrioritizingInput cardStore={card} />
            <Flex direction="column" flex="1 0 auto">
              <DateTimeEditableItem
                title="Start After"
                date={card.actual.startAfterDate}
                timeOffset={card.actual.startAfterOffset}
                onChange={(date, offset) => {
                  card.setStringOrNullValue(`startAfterDate`, date);
                  card.setNumberOrNullValue(`startAfterOffset`, offset);
                }}
              />
              <DateTimeEditableItem
                title="Planned Start"
                date={card.actual.plannedStartDate}
                timeOffset={card.actual.plannedStartOffset}
                onChange={(date, offset) => {
                  card.setStringOrNullValue(`plannedStartDate`, date);
                  card.setNumberOrNullValue(`plannedStartOffset`, offset);
                }}
              />
              <DateTimeEditableItem
                title="Due To"
                date={card.actual.dueToDate}
                timeOffset={card.actual.dueToOffset}
                onChange={(date, offset) => {
                  card.setStringOrNullValue(`dueToDate`, date);
                  card.setNumberOrNullValue(`dueToOffset`, offset);
                }}
              />
            </Flex>
          </Flex>
        </TaskFieldFormItem>
        <TaskFieldFormItem>
          <Badge
            size="xl"
            style={{
              '--badge-padding-x': `0.2rem`,
              textTransform: `none`,
              paddingLeft: `0.5rem`,
            }}
            rightSection={<UserButton userId={card.actual.responsibleId || null} />}
          >
            Responsible
          </Badge>
        </TaskFieldFormItem>
      </Flex>
    </Paper>
  );
});

const dangerColorMantine = 'red.6';

const ButtonWithPopover = observer<{
  renderTarget: (open: () => void, close: () => void) => ReactNode;
  renderDropdown: (close: () => void) => ReactNode;
}>(function ButtonWithPopover({ renderTarget, renderDropdown }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Popover withArrow opened={opened} onDismiss={close} shadow="0 0 10px rgba(0,0,0,0.4)">
      <Popover.Dropdown>{renderDropdown(close)}</Popover.Dropdown>
      <Popover.Target>{renderTarget(open, close)}</Popover.Target>
    </Popover>
  );
});

export const TaskEditForm = observer<{
  card: TaskCardStore;
  isLast: boolean;
  top: number;
}>(function TaskEditForm({ card, top, isLast }) {
  const { timeMs, transitionAllEaseFull } = useAnimationConfig();

  const resetProps = useMemo(() => {
    const subProps = {
      renderTarget: (open: () => void): ReactNode => (
        <Button flex="0 0 auto" color={dangerColorMantine} onClick={open} leftSection={<IconTrash />}>
          Reset
        </Button>
      ),
      renderDropdown:
        (close1: () => void) =>
        (close2: () => void): ReactNode => (
          <Flex gap="sm" align="center" w="24rem">
            <Box flex="1 1 auto">Are you sure-sure?</Box>
            <Button
              flex="0 0 auto"
              color={dangerColorMantine}
              onClick={() => {
                card.reset();
                close2();
                close1();
              }}
              leftSection={<IconTrash />}
            >
              Destroy changes
            </Button>
          </Flex>
        ),
    } as const;

    return {
      renderTarget: (open: () => void): ReactNode => (
        <ActionIcon size="xl" color={dangerColorMantine} onClick={open} pos="relative">
          <IconRestore />
          <Flex pos="absolute" right={0} bottom={0} fz="0.8rem">
            {card.changesKeys.length}
          </Flex>
        </ActionIcon>
      ),
      renderDropdown: (close1: () => void): ReactNode => (
        <Flex gap="sm" align="end" w="30rem">
          <Flex flex="1 1 auto" direction="column" gap="sm">
            <Box>Are you sure you want to reset all changes?</Box>
            {card.changesKeys.map(key => (
              <Card key={key} withBorder>
                <Flex>
                  <Flex flex="1 0 auto">{key}</Flex>
                  <ActionIcon
                    onClick={() => {
                      card.resetChange(key);
                      if (!card.hasChanges) {
                        close1();
                      }
                    }}
                  >
                    <IconRestore />
                  </ActionIcon>
                </Flex>
              </Card>
            ))}
          </Flex>

          <ButtonWithPopover
            renderTarget={subProps.renderTarget}
            renderDropdown={subProps.renderDropdown(close1)}
          />
        </Flex>
      ),
    } as const;
  }, [card]);

  return (
    <Flex
      style={{
        transition: `transform ${timeMs}ms ease`,
        transform: `translateY(${2 * (top + (isLast ? 1 : 0))}rem) translateZ(${isLast ? -1 : -7}rem) rotateX(${isLast ? '0deg' : `-40deg`})`,
        position: `absolute`,
        right: `0.5rem`,
        pointerEvents: `all`,
        zIndex: 100,
        top: `-2rem`,
        width: `100%`,
      }}
    >
      <TaskEditContent card={card} isLast={isLast} hasChanges={card.hasChanges} />
      <Flex
        direction="column"
        gap={8}
        pos="absolute"
        p={8}
        style={{
          transition: transitionAllEaseFull,
          transform: `translateX(-100%)`,
          opacity: isLast ? 1 : 0,
          pointerEvents: isLast ? `all` : `none`,
        }}
      >
        {card.hasChanges ? (
          <>
            <ActionIcon size="xl" onClick={() => card.submit()}>
              <IconCheck />
            </ActionIcon>
            <ButtonWithPopover {...resetProps} />
          </>
        ) : (
          <>
            <ActionIcon size="xl" variant="light" onClick={() => card.close()}>
              <IconX />
            </ActionIcon>
          </>
        )}
      </Flex>
    </Flex>
  );
});

const TasksForms = observer(function TasksForms() {
  const storage = useStorage();

  const { stableSorted, indexes } = useMemo(
    () =>
      computed(() => ({
        stableSorted: sortBy(storage.tasks.opened, c => c.id),
        indexes: new ExMap(storage.tasks.opened.map((c, idx) => [c.id, idx])),
      })),
    []
  ).get();

  return (
    <>
      {stableSorted.map(card => {
        const index = indexes.get(card.id)!;
        return (
          <TaskEditForm key={card.id} card={card} isLast={index >= stableSorted.length - 1} top={index} />
        );
      })}
    </>
  );
});

export const CardsStack = observer(function CardsStack() {
  const storage = useStorage();

  const [hover, setHover] = useState(false);

  const { timeMs } = useAnimationConfig();

  return storage.tasks.opened.length > 0 ? (
    <Overlay
      fixed
      styles={{
        root: {
          pointerEvents: `none`,
          '--overlay-z-index': 500,
          transition: `all ease ${timeMs}ms ${timeMs}ms`,
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      blur={!hover ? 0 : 5}
      zIndex={1}
      backgroundOpacity={hover ? 0.7 : 0.2}
      style={{ '--overlay-z-index': 100 } as CSSProperties}
    >
      <Flex
        pos="fixed"
        // left="0"
        top="0"
        right="0"
        bottom="0"
        direction="column"
        align="end"
        w={600}
        style={{ transformStyle: `preserve-3d`, perspective: 1200 }}
      >
        <TasksForms />
      </Flex>
    </Overlay>
  ) : null;
});
