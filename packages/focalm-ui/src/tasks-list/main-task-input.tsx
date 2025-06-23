import { ActionIcon, Badge, Flex, NavLink, Popover, Textarea, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowsMaximize, IconSend2 } from '@tabler/icons-react';
import Fuse from 'fuse.js';
import { observer } from 'mobx-react-lite';
import { ReactNode, useMemo, useState } from 'react';

import { mantinePopoverShadow } from '../shared/const';
import { RootStorage, useStorage } from '../storage/storage';

export const WithProjectSelection = observer<{
  onSelected: (role: RootStorage[`projects`][`cache`][string]) => void;
  renderTarget: (open: () => void, opened: boolean) => ReactNode;
  dropdownPortal?: HTMLDivElement;
}>(function WithProjectSelection({ onSelected, renderTarget, dropdownPortal }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState(``);

  const storage = useStorage();
  const fuse = useMemo(() => new Fuse(Object.values(storage.projects.cache), { keys: [`name`] }), [storage]);

  const list = useMemo(
    () => (search && fuse ? fuse.search(search).map(r => r.item) : Object.values(storage.projects.cache)),
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
      <Popover.Target>{renderTarget(open, opened)}</Popover.Target>
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

const prepareTitle = (title: string) => title.replace(/\n/g, ` `).trim();

export const MainTaskInput = observer(function MainTaskInput() {
  const storage = useStorage();

  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(``);
  const [inputProject, setInputProject] = useState<RootStorage[`projects`][`cache`][string]>();

  const trimmed = prepareTitle(inputValue);

  return (
    <Flex pos="relative">
      <Textarea
        minRows={1}
        maxRows={5}
        autosize
        w="100%"
        placeholder="Add..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDownCapture={e => {
          if (e.key === `Enter`) {
            if (trimmed && inputProject) {
              storage.tasks.createNewTask(trimmed, inputProject.id);
            }
            e.preventDefault();
          }
        }}
        rightSectionWidth="4rem"
        rightSection={
          <>
            <ActionIcon
              variant="white"
              disabled={!inputProject}
              onClick={() => {
                if (inputProject) {
                  storage.tasks.openNewTaskCard(trimmed, inputProject.id);
                }
              }}
            >
              <IconArrowsMaximize />
            </ActionIcon>
            <ActionIcon
              variant="white"
              disabled={!inputProject || !trimmed}
              onClick={() => {
                if (trimmed && inputProject) {
                  storage.tasks.createNewTask(trimmed, inputProject.id);
                }
              }}
            >
              <IconSend2 />
            </ActionIcon>
          </>
        }
        onFocus={() => {
          setFocused(true);
          if (!inputProject && storage.projects.selectedProjectId) {
            setInputProject(storage.projects.cache[storage.projects.selectedProjectId] ?? undefined);
          }
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      <WithProjectSelection
        renderTarget={(open, opened) => (
          <Badge
            pos="absolute"
            right={0}
            style={{ transform: `translateY(-100%)`, opacity: focused || opened ? 1 : 0 }}
            onClick={open}
          >
            {inputProject?.name}
          </Badge>
        )}
        onSelected={project => setInputProject(project)}
      ></WithProjectSelection>
    </Flex>
  );
});
