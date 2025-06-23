import { notNull } from '@freyja/kit/utils/flow-utils';
import {
  ActionIcon,
  Box,
  Button,
  Combobox,
  Flex,
  Input,
  InputBase,
  Loader,
  Popover,
  Select,
  Text,
  useCombobox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconX } from '@tabler/icons-react';
import { sortBy } from 'lodash';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import { ExMap } from '../../../../../../gurban/packages/kit/src/ex-map';
import { NoItems } from '../../components/no-items';
import { TaskToTaskRelationType } from '../../graphql.generated/_types';
import { useSearchTasksQuery } from '../../graphql.generated/tasks';
import { ellipsisChar, mantinePopoverShadow } from '../../shared/const';
import { useStorage } from '../../storage/storage';
import { TaskCardStore } from '../../storage/task-card-store';
import { maybeNullish } from '../../utils/util';
import classNames from './parts.module.scss';

const TaskLink = observer<{
  taskId: string;
}>(function TaskLink({ taskId }) {
  const storage = useStorage();

  const { task } = useMemo(
    () =>
      computed(() => {
        const task = maybeNullish(storage.tasks.stored[taskId]);
        return { task };
      }),
    [storage, taskId]
  ).get();

  return (
    <Text pl="1rem" td="underline">
      {task ? task.title : <Loader />}
    </Text>
  );
});

const RelationTypeSelect = observer<{
  projectId: string;
  value: { typeId: string; inverse: boolean } | null;
  onSelect: (v: { typeId: string; inverse: boolean } | null) => void;
}>(function RelationTypeSelect({ projectId, value, onSelect }) {
  const storage = useStorage();
  const { data } = useMemo(
    () =>
      computed(() => ({
        data: Object.values(storage.projects.cache[projectId]?.relationTypes)
          .map(rt => [
            { value: `>${rt.id}`, label: rt.forward },
            { value: `<${rt.id}`, label: rt.inverse },
          ])
          .flat(),
      })),
    [storage, projectId]
  ).get();

  return (
    <Select
      comboboxProps={{ withinPortal: false }}
      label="Relation"
      data={data}
      value={value ? `${value.inverse ? `<` : `>`}${value.typeId}` : null}
      onChange={v => {
        onSelect(v ? { typeId: v.slice(1), inverse: v[0] === `<` } : null);
      }}
    />
  );
});

const TaskSearchInput = observer<{
  value: { id: string; title: string } | undefined;
  onSelect: (task: { id: string; title: string }) => void;
}>(function TaskSearchInput({ value, onSelect }) {
  const [search, setSearch] = useState<string>('');

  const [{ data, fetching, error }, execute] = useSearchTasksQuery({
    variables: { titleLike: search },
    pause: true,
  });

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
    },
    onDropdownOpen: () => {
      if (!fetching) {
        execute();
      }
    },
  });

  useEffect(() => {
    if (!fetching) {
      execute();
    }
  }, [execute, search]);

  const options = data?.searchTasks.tasks.map(item => (
    <Combobox.Option value={item.id} key={item.id}>
      {item.title}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={val => {
        const v = data?.searchTasks.tasks.find(o => o.id === val);
        if (v) {
          setSearch(v.title);
          onSelect(v);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={event => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value?.title ?? '');
          }}
          placeholder="Search value"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {fetching ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
});

const AddRelationButton = observer<{
  card: TaskCardStore;
  initialType?: { typeId: string; inverse: boolean };
  submit: (srcId: string, dstId: string, typeId: string) => void;
  target: (open: () => void) => ReactNode;
}>(function AddRelationButton({ card, submit, target, initialType }) {
  const [relationType, setRelationType] = useState<{ typeId: string; inverse: boolean } | null>(null);
  const [targetTask, setTargetTask] = useState<{ id: string; title: string }>();

  const [opened, { open, close }] = useDisclosure(false, {
    onOpen: () => setRelationType(initialType ?? null),
  });

  const targetNode = useMemo(() => computed(() => target(open)), [target, open]);

  return (
    <Popover
      position="left"
      closeOnEscape
      trapFocus
      opened={opened}
      onOpen={open}
      onDismiss={close}
      withArrow
      shadow={mantinePopoverShadow}
    >
      <Popover.Target>{targetNode.get()}</Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column" gap="sm">
          <RelationTypeSelect
            projectId={card.realProjectId}
            value={relationType}
            onSelect={setRelationType}
          />
          <Input.Wrapper label="Destination">
            <TaskSearchInput value={targetTask} onSelect={setTargetTask} />
          </Input.Wrapper>
          <Button
            leftSection={<IconPlus />}
            disabled={!relationType || !targetTask}
            onClick={() => {
              if (!relationType || !targetTask) {
                return;
              }
              const { typeId, inverse } = relationType;
              const [srcId, dstId] = inverse ? [targetTask.id, card.taskId] : [card.taskId, targetTask.id];
              submit(srcId, dstId, typeId);
              close();
            }}
          >
            Add
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
});

const RelationsGroupHeader = observer<{
  card: TaskCardStore;
  type: RelationType;
  inverse: boolean;
}>(function RelationsGroupHeader({ card, type, inverse }) {
  return (
    <Flex justify="space-between" className={classNames.relationsBlockSomeItem} gap="xs">
      <Text fw="bold">
        {type ? <>{ellipsisChar + (inverse ? type.inverse : type.forward) + ':'}</> : <Loader />}
      </Text>
      <Box className={classNames.relationsHoverLine} />
      <AddRelationButton
        initialType={{ typeId: type.id, inverse }}
        card={card}
        submit={(srcId, dstId, typeId) => {
          card.addRelation(srcId, dstId, typeId);
        }}
        target={open => (
          <ActionIcon variant="light" onClick={open}>
            <IconPlus />
          </ActionIcon>
        )}
      />
    </Flex>
  );
});

type RelationType = Pick<TaskToTaskRelationType, `id` | `forward` | `inverse`>;

const RelationItem = observer<{
  rs: readonly {
    srcId: string;
    dstId: string;
  }[];

  card: TaskCardStore;
  type: RelationType;
  inverse: boolean;
}>(function RelationItem({ card, rs, type, inverse }) {
  return (
    <Flex direction="column" align="stretch" gap="xs">
      <RelationsGroupHeader card={card} type={type} inverse={inverse} />

      {rs.map(r => (
        <Flex key={r.dstId} className={classNames.relationsBlockSomeItem} align="center" gap="xs">
          <TaskLink taskId={r.dstId} />
          <Box className={classNames.relationsHoverLine} />
          <ActionIcon
            mr="2rem"
            variant="white"
            size="xs"
            className={classNames.showOnParentHover}
            onClick={() => {
              const [srcId, dstId] = inverse ? [r.dstId, r.srcId] : [r.srcId, r.dstId];
              card.removeRelation(srcId, dstId, type.id);
            }}
          >
            <IconX />
          </ActionIcon>
        </Flex>
      ))}
    </Flex>
  );
});

export const RelationsBlock = observer<{
  card: TaskCardStore;
}>(function RelationsBlock({ card }) {
  const storage = useStorage();

  const { flat } = useMemo(
    () =>
      computed(() => {
        const relations = [
          ...(card.actual.relationsSrc || []).map(r => ({
            srcId: card.taskId,
            dstId: r.dstId,
            typeId: r.typeId,
            inverse: false,
          })),
          ...(card.actual.relationsDst || []).map(r => ({
            srcId: card.taskId,
            dstId: r.srcId,
            typeId: r.typeId,
            inverse: true,
          })),
        ];

        const byType = ExMap.groupedBy(relations, r => r.typeId).mapEntries(r =>
          ExMap.groupedBy(r, r => r.inverse)
        );

        const types = byType.mapEntries((v, typeId) =>
          maybeNullish(storage.projects.cache[card.realProjectId]?.relationTypes[typeId])
        );

        const flat = sortBy(
          byType
            .toArray((rs, typeId) =>
              rs.toArray((rs, inverse) => [notNull(types.get(typeId)), inverse, rs] as const)
            )
            .flat(),
          ([type, inverted]) => (inverted ? type.inverse : type.forward)
        );

        return { flat };
      }),
    [storage, card]
  ).get();

  return (
    <Flex direction="column" p="sm" gap="sm">
      {flat.length ? (
        flat.map(([type, inverse, rs]) => (
          <RelationItem
            key={`${type.id}:${inverse ? 1 : 0}`}
            card={card}
            rs={rs}
            inverse={inverse}
            type={type}
          />
        ))
      ) : (
        <>
          <NoItems>No relations</NoItems>
          <AddRelationButton
            card={card}
            submit={(srcId, dstId, typeId) => {
              card.addRelation(srcId, dstId, typeId);
            }}
            target={open => (
              <Button leftSection={<IconPlus />} variant="light" onClick={open}>
                Add
              </Button>
            )}
          />
        </>
      )}
    </Flex>
  );
});
