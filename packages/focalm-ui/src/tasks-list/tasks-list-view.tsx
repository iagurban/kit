import { Badge, Box, Button, Checkbox, Flex, Paper, Popover, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconCircle, IconClockCheck, IconClockPlay, IconClockStop } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { sortBy } from 'lodash';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

import { Task, TaskState } from '../graphql.generated/_types';
import { gainBadgeColor } from '../shared/const';
import { fonts } from '../shared/fonts';
import { useStorage } from '../storage/storage';
import { distanceTo00 } from '../utils/geometry';
import { useDatesFormats } from '../utils/react-contexts';
import { secondsOffsetToString } from '../utils/seconds-offset';
import classNames from './list.module.scss';
import { MainTaskInput } from './main-task-input';

const NumericBadge = observer<{
  value: number;
  label: string;
  withPercent?: boolean;
  withOverlap?: boolean;
}>(function NumericBadge({ value, label, withPercent, withOverlap }) {
  const valueStr = Math.round(value * 100) + '%';
  const fl = label[0].toLocaleUpperCase(`en-US`);
  return (
    <Tooltip label={`${fl}${label.slice(1)}${!withPercent ? `: ${valueStr}` : ''}`} withArrow>
      <Badge
        variant="light"
        color={gainBadgeColor(value)}
        autoContrast
        style={{ marginRight: withOverlap ? `-1rem` : undefined }}
      >
        <Flex display="inline">
          <Box
            display="inline"
            ff={
              //   fonts.breeSerif
              // fonts.artifika
              // fonts.cherrySwash
              // fonts.creteRound
              // fonts.kumarOneOutline
              fonts.portLligatSlab
              // fonts.ribeyeMarrow
              // fonts.slabo27px
              // fonts.tourney
            }
            fz="0.9rem"
          >
            {fl}
          </Box>
          {withPercent && ' ' + valueStr}
        </Flex>
      </Badge>
    </Tooltip>
  );
});

const Indicators = observer<{
  variant: `brief` | `formula`;
  data: Pick<Task, `ease` | `impact`>;
}>(function Indicators({ variant, data }) {
  return (
    <Flex align="center" gap={'0.2rem'}>
      {variant === `formula` ? (
        <>
          <NumericBadge value={data.impact} label="impact" withPercent />
          <Box>⊕</Box>
          <NumericBadge value={data.ease} label="ease" withPercent />
          <Box>=</Box>
          <NumericBadge value={distanceTo00(data.ease, data.impact)} label="gain" withPercent />
        </>
      ) : (
        <>
          <NumericBadge value={data.impact} label="impact" withOverlap />
          <NumericBadge value={data.ease} label="ease" withOverlap />
          <NumericBadge value={distanceTo00(data.ease, data.impact)} label="gain" withPercent />
        </>
      )}
    </Flex>
  );
});

const DateTimeBadge = observer<{
  date: string | null | undefined;
  offset: number | null | undefined;
  icon: ReactNode;
  color: string;
  label: string;
}>(function DateTimeBadge({ date, offset, icon, color, label }) {
  const formats = useDatesFormats();

  return date ? (
    <Tooltip label={label} withArrow>
      <Badge leftSection={icon} color={color} variant="outline">
        {dayjs(date).format(formats.dateFormat)} {offset != null && secondsOffsetToString(offset)}
      </Badge>
    </Tooltip>
  ) : null;
});

const StateCheckbox = observer<{
  task: Pick<Task, `id` | `state`>;
}>(function StateCheckbox({ task }) {
  const storage = useStorage();

  const [opened, { close, open }] = useDisclosure();

  return (
    <Popover opened={opened} onDismiss={close}>
      <Popover.Target>
        <Checkbox
          readOnly
          checked={task.state === TaskState.Done}
          indeterminate={task.state === TaskState.Active}
          onClick={e => {
            if (e.defaultPrevented) {
              return;
            }
            open();
            e.preventDefault();
          }}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Flex gap="sm" align="center">
          <Box>Mark {task.state !== TaskState.Done ? `completed` : `pending`}?</Box>
          <Button
            color="green.5"
            leftSection={task.state !== TaskState.Done ? <IconCheck /> : <IconCircle />}
            onClick={e => {
              close();
              storage.tasks.pushUpdates([
                {
                  taskId: task.id,
                  field: `state`,
                  value: task.state !== TaskState.Done ? TaskState.Done : TaskState.Pending,
                },
              ]);
              e.preventDefault();
            }}
          >
            Mark
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
});

export const TasksListView = observer(function TasksListView() {
  const storage = useStorage();

  return (
    <Flex flex="1 0 auto" direction="column" h="100%" w="100%">
      <Flex flex="1 0 auto" direction="column">
        {sortBy([...storage.tasks.actualTasks.values()], t => t.orderKey).map(t => (
          <Flex key={t.id} direction="column" px={4} py={2}>
            <Paper
              p={8}
              withBorder
              onClick={e => void (e.defaultPrevented || storage.tasks.openTask(t.id))}
              className={classNames.taskItemRoot}
            >
              <Flex align="center" gap="xs">
                <StateCheckbox task={t} />
                <Text
                  flex="1 0 auto"
                  td={t.state === TaskState.Done ? 'line-through' : undefined}
                  c={t.state === TaskState.Done ? `dimmed` : undefined}
                >
                  {t.title}
                </Text>

                <DateTimeBadge
                  date={t.startAfterDate}
                  offset={t.startAfterOffset}
                  icon={<IconClockPlay size="1rem" />}
                  color="orange.5"
                  label="Start After"
                />
                <DateTimeBadge
                  date={t.plannedStartDate}
                  offset={t.plannedStartOffset}
                  icon={<IconClockCheck size="1rem" />}
                  color="green.7"
                  label="Planned Start"
                />
                <DateTimeBadge
                  date={t.dueToDate}
                  offset={t.dueToOffset}
                  icon={<IconClockStop size="1rem" />}
                  color="red.5"
                  label="Due To"
                />
                <Indicators variant="brief" data={t} />
              </Flex>
            </Paper>
          </Flex>
        ))}
      </Flex>
      <MainTaskInput />
    </Flex>
  );
});
