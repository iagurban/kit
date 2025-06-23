import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Overlay,
  Paper,
  Popover,
  Tabs,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconCopyX, IconInfoCircle, IconRestore, IconTrash, IconX } from '@tabler/icons-react';
import { create } from 'jsondiffpatch';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { lazy, PropsWithChildren, ReactNode, Suspense, useLayoutEffect, useMemo, useState } from 'react';

import { ButtonWithPopover } from '../components/button-with-popover';
import { dangerColorMantine } from '../shared/const';
import { useStorage } from '../storage/storage';
import { TaskCardStore } from '../storage/task-card-store';
import { useAnimationConfig } from '../utils/react-contexts';
import { DatesManagementBlock } from './parts/dates-management-block';
import { ParticipantsEditorBlock } from './parts/participants-editor-block';
import { PrioritizingBlock } from './parts/prioritizing-block';
import { RelationsBlock } from './parts/relations-block';
import { TitleBlock } from './parts/title-block';

const RichTextBlock = lazy(() => import('./parts/rich-text-block'));

const jdp = create();

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

const BaldLine = observer<{
  color: string;
  visible: boolean;
}>(function BaldLine({ color, visible }) {
  const { transitionAllEaseFull } = useAnimationConfig();

  return (
    <Flex
      bg={color}
      pos="absolute"
      left={0}
      top={0}
      right={0}
      h="0.3rem"
      style={{ opacity: visible ? 1 : 0, transition: transitionAllEaseFull }}
    />
  );
});

const InnerCardOverlay = observer<{
  isLast: boolean;
  card: TaskCardStore;
}>(function InnerCardOverlay({ card, isLast }) {
  const storage = useStorage();

  const { transitionAllEaseFull } = useAnimationConfig();

  return (
    <Overlay
      pos="absolute"
      gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 1rem, rgba(0, 0, 0, 0.4) 3rem, rgba(0, 0, 0, 0.5) 100%)"
      onClick={e => {
        e.preventDefault();
        storage.tasks.revealCard(card.id);
      }}
      // style={{ '--overlay-z-index': 100 }}
      blur={0.001}
      style={{
        transition: transitionAllEaseFull,
        cursor: `pointer`,
        opacity: isLast ? 0 : 1,
        pointerEvents: isLast ? `none` : `all`,
      }}
    />
  );
});

const TaskEditContent = observer<{
  card: TaskCardStore;
  isLast: boolean;
  hasChanges: boolean;
}>(function TaskEditContent({ card, isLast, hasChanges }) {
  return (
    <Paper
      radius="md"
      styles={{
        root: {
          padding: 0,
          overflow: `hidden`,
          width: `100%`,
        },
      }}
      pos="relative"
      shadow="xs"
    >
      <BaldLine color={dangerColorMantine} visible={hasChanges} />
      <Flex direction="column" pt="xs">
        <InnerCardOverlay card={card} isLast={isLast} />

        <TaskFieldFormItem>
          <TitleBlock
            value={card.actual.title || ``}
            onChange={value => card.setStringValue(`title`, value)}
          />
        </TaskFieldFormItem>
        <TaskFieldFormItem>
          <Flex>
            <PrioritizingBlock cardStore={card} />
            <DatesManagementBlock card={card} />
          </Flex>
        </TaskFieldFormItem>
        <TaskFieldFormItem>
          <ParticipantsEditorBlock card={card} />
        </TaskFieldFormItem>
        <TaskFieldFormItem>
          <Tabs defaultValue="relations">
            <Tabs.List>
              <Tabs.Tab value="description">description</Tabs.Tab>
              <Tabs.Tab value="relations">relations</Tabs.Tab>
              <Tabs.Tab value="history">history</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="description">
              <Suspense fallback={<div>Loading...</div>}>
                <RichTextBlock
                  value={card.actual.description || { type: `doc` }}
                  onChange={e => {
                    card.setJsonValue(`description`, { ...e });
                    console.log(e, jdp.diff(toJS(card.originalRef.maybeCurrent?.description ?? {}), e));
                  }}
                />
              </Suspense>
            </Tabs.Panel>
            <Tabs.Panel value="relations">
              <RelationsBlock card={card} />
            </Tabs.Panel>
            <Tabs.Panel value="history">History</Tabs.Panel>
          </Tabs>
        </TaskFieldFormItem>
      </Flex>
    </Paper>
  );
});

const InfoButton = observer<{
  card: TaskCardStore;
}>(function InfoButton({ card }) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <ActionIcon size="xl" variant="white" onMouseEnter={open} onMouseLeave={close}>
          <IconInfoCircle />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>ID: [{card.taskId}]</Popover.Dropdown>
    </Popover>
  );
});

const ResetButton = observer<{
  card: TaskCardStore;
}>(function ResetButton({ card }) {
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

  return <ButtonWithPopover {...resetProps} />;
});

const CardActionButtons = observer<{
  card: TaskCardStore;
  isLast: boolean;
}>(function CardActionButtons({ card, isLast }) {
  const { transitionAllEaseFull } = useAnimationConfig();

  return (
    <Flex
      direction="column"
      gap={8}
      pos="absolute"
      right={0}
      p={8}
      style={{
        transition: transitionAllEaseFull,
        transform: `translateX(100%)`,
        opacity: isLast ? 1 : 0,
        pointerEvents: isLast ? `all` : `none`,
      }}
    >
      {card.hasChanges ? (
        <>
          <ActionIcon size="xl" onClick={() => card.submit()}>
            <IconCheck />
          </ActionIcon>
          <ResetButton card={card} />
        </>
      ) : (
        <>
          <ActionIcon size="xl" variant="white" onClick={() => card.close()}>
            <IconX />
          </ActionIcon>
          <Popover withArrow position="left">
            <Popover.Target>
              <ActionIcon size="xl" variant="outline">
                <IconCopyX />
                {/*<IconPentagonX />*/}
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Flex align="center" gap="sm">
                <Box>Close all unchanged cards?</Box>
                <Button onClick={() => card.storage.closeAllCards()} color={dangerColorMantine}>
                  Yes
                </Button>
              </Flex>
            </Popover.Dropdown>
          </Popover>
          {/*<ActionIcon size="xl" variant="light" onClick={() => card.storage.setCardsHidden(true)}>*/}
          {/*  <IconChevronsRight />*/}
          {/*</ActionIcon>*/}

          <ActionIcon size="xl" opacity={0} />

          <InfoButton card={card} />
        </>
      )}
    </Flex>
  );
});

export const CardForm = observer<{
  card: TaskCardStore;
  isLast: boolean;
  top: number;
  onHover: (enter: boolean) => void;
}>(function CardForm({ card, top, isLast, onHover }) {
  const { timeMs } = useAnimationConfig();

  const [mounted, setMounted] = useState(false);
  useLayoutEffect(() => {
    setTimeout(() => setMounted(true), 10);
  }, []);

  return (
    <Flex
      style={{
        transition: `transform ${timeMs}ms ease`,
        transform: [
          `translateX(${mounted ? `0%` : `calc(100% + 4rem)`})`,
          `translateY(calc(${top + (isLast ? 4 : 0)}rem - ${isLast ? 2 : 0.2}rem))`,
          `translateZ(${isLast ? 0 : -6}rem)`,
          `rotateX(${isLast ? '0deg' : `-40deg`})`,
        ].join(` `),
        transformOrigin: `top center`,
        position: `absolute`,
        right: `0.5rem`,
        pointerEvents: `all`,
        zIndex: 100,
        top: `-2rem`,
        width: `100%`,
        cursor: `default`,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <TaskEditContent card={card} isLast={isLast} hasChanges={card.hasChanges} />
      <CardActionButtons card={card} isLast={isLast} />
    </Flex>
  );
});
