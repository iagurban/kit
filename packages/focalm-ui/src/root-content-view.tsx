import { uidGenerator } from '@freyja/kit/core/uid-generator';
import { notNull } from '@freyja/kit/utils/flow-utils';
import { Nullish } from '@freyja/kit/utils/types';
import { createUsableContext } from '@freyja/kit-ui/react/react';
import {
  Box,
  Divider,
  Drawer,
  Flex,
  Input,
  Paper,
  Popover,
  Slider,
  Textarea,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { hsl } from 'chroma.ts';
import dayjs from 'dayjs';
import { sortBy } from 'lodash';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CSSProperties, PropsWithChildren, useMemo } from 'react';

import { Task } from './graphql.generated/_types';
import { observerWithForwardRef } from './mobx-util';
import { Synchronizer, useStorage } from './storage';

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

class TaskCardStore {
  constructor(readonly task: () => Exclude<ReturnType<Synchronizer[`actualTasks`][`get`]>, Nullish>) {
    makeAutoObservable(this);
  }

  @observable
  editing: {
    values: Partial<Task>;
    mode: `single` | `multiple`;
  } = { values: {}, mode: `single` };

  @computed
  get actual() {
    let draft = { ...this.task() };
    for (const [key, value] of Object.entries(this.editing.values)) {
      draft = { ...draft, [key]: value };
    }
    return draft;
  }

  @action
  setStringValue(key: `title`, value: string) {
    this.editing.values[key] = value;
  }

  @action
  setNumberValue(key: `ease` | `impact`, value: number) {
    this.editing.values[key] = value;
  }
}

const { use: useDatesFormats, provider: ProvideDatesFormats } = createUsableContext<{
  dateFormat: string;
  timeFormat: string;
}>(`DatesFormatsContext`);

const editableLabelDecoration = {
  textDecorationStyle: `dashed`,
  textDecorationLine: `underline`,
  textDecorationColor: `#aaa`,
  textDecorationThickness: `1px`,
} as CSSProperties;

const DateTimeEditableLabel = observer<{
  value: Date;
  onChange(date: Date): void;
}>(function DateTimeEditableLabel({ value, onChange }) {
  const ctx = useDatesFormats();
  const parsed = useMemo(
    () =>
      (v =>
        v.isValid()
          ? {
              date: v.format(ctx.dateFormat),
              time: v.format(ctx.timeFormat),
            }
          : null)(dayjs(value)),
    [ctx]
  );
  return (
    <Box display="inline">
      {parsed ? (
        <>
          <Box display="inline" style={{ ...editableLabelDecoration }}>
            {parsed.date}
          </Box>
          {` `}
          <Box display="inline" style={{ ...editableLabelDecoration }}>
            {parsed.time}
          </Box>
        </>
      ) : (
        <Box style={{ ...editableLabelDecoration }}>{`<None>`}</Box>
      )}
    </Box>
  );
});

const DateTimeEditableItem = observer<{
  value: Date;
  onChange(date: Date): void;
  title: string;
}>(function DateTimeEditableItem({ title, ...props }) {
  return (
    <Flex align="baseline" justify="space-between" py="2">
      <Box>{title}</Box>
      <DateTimeEditableLabel {...props} />
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

const distanceTo00 = (x: number, y: number) => Math.sqrt(x * x + y * y);
const distance00to11 = distanceTo00(1, 1);

const scaleFrom01 = (v: number, min: number, max: number) => v * (max - min) + min;

const goodnessHue = (r: number) => scaleFrom01(r, 1, 190);

const Ratio2DGraphSvg = observer(function Ratio2DGraphSvg() {
  const maskId = useMemo(() => `Ratio2DGraph_${uidGenerator()}`, []);

  const circle = (r: number) => (
    <circle
      cx="0"
      cy="100"
      r={Math.floor(distance00to11 * r * 100)}
      fill="none"
      stroke={hsl(goodnessHue(r), 0.5, 0.5).hex()}
      strokeWidth="1"
      strokeDasharray="2 6"
      mask={`url(#${maskId})`}
    />
  );

  return (
    <svg style={{ overflow: `visible` }} viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
      <mask id={maskId}>
        <rect x="0" y="0" width="100" height="100" fill="white" />
      </mask>
      {circle(0.25)}
      {circle(0.5)}
      {circle(0.75)}
      <path
        d={`M0,100 L0,0 L-4,10 M0,0 L4,10 M0,100 L100,100 L90,96 M100,100 L90,104`}
        fill="none"
        stroke="#000"
        strokeWidth="1"
      />
    </svg>
  );
});

const Ratio2DGraph = observerWithForwardRef<
  {
    xLabel: string;
    x: number;
    yLabel: string;
    y: number;
  },
  HTMLDivElement
>(function Ratio2DGraph({ xLabel, x, yLabel, y }, forwardedRef) {
  const axisLabelStyle = { fontSize: `0.7rem`, fontStyle: `italic` } satisfies CSSProperties;

  const goodness = distanceTo00(x, y) / distance00to11;

  return (
    <Box
      ref={forwardedRef}
      pos="relative"
      style={{ alignSelf: `stretch`, justifySelf: `stretch`, width: `5rem`, height: `5rem` }}
    >
      <Ratio2DGraphSvg />
      <Box pos="absolute" right="0.5rem" bottom={0} style={axisLabelStyle}>
        {xLabel}
      </Box>
      <Box
        pos="absolute"
        left="0.5rem"
        top="0.5rem"
        style={{
          ...axisLabelStyle,
          transform: `rotate(90deg) translateY(-100%) translateY(0.5rem)`,
          transformOrigin: `left top`,
        }}
      >
        {yLabel}
      </Box>
      <Tooltip
        label={
          <Box>
            goodness: {goodness}{' '}
            <Box
              display="inline-block"
              bg={hsl(goodnessHue(goodness), 0.8, 0.4).hex()}
              w={`0.7rem`}
              h={`0.7rem`}
              style={{
                border: `1px solid #aaa`,
                borderRadius: `50%`,
              }}
            />
          </Box>
        }
      >
        <Box
          bg={hsl(goodnessHue(goodness), 0.8, 0.4).hex()}
          w={`0.9rem`}
          h={`0.9rem`}
          pos="absolute"
          left={`${x * 100}%`}
          bottom={`${y * 100}%`}
          style={{
            border: `1px solid #aaa`,
            transform: `translate(-50%,50%)`,
            borderRadius: `50%`,
          }}
        />
      </Tooltip>
    </Box>
  );
});

const PrioritizingFormItem = observer<{
  cardStore: TaskCardStore;
}>(function PrioritizingFormItem({ cardStore }) {
  return (
    <Popover opened>
      <Popover.Target>
        <Ratio2DGraph xLabel="impact" x={cardStore.actual.impact} yLabel="ease" y={cardStore.actual.ease} />
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column" w="20rem">
          <Input.Wrapper label="Ease">
            <Slider
              label={`${Math.round(cardStore.actual.ease * 100)}%`}
              value={cardStore.actual.ease * 100}
              max={100}
              min={0}
              onChange={v => cardStore.setNumberValue(`ease`, v / 100)}
            />
          </Input.Wrapper>

          <Input.Wrapper label="Impact">
            <Slider
              label={`${Math.round(cardStore.actual.impact * 100)}%`}
              value={cardStore.actual.impact * 100}
              max={100}
              min={0}
              onChange={v => cardStore.setNumberValue(`impact`, v / 100)}
            />
          </Input.Wrapper>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
});

export const TaskEditForm = observer<{
  task: () => Exclude<ReturnType<Synchronizer[`actualTasks`][`get`]>, Nullish>;
}>(function TaskEditForm({ task }) {
  const [opened, { open, close }] = useDisclosure(true);

  const storage = useStorage();

  const theme = useMantineTheme();

  const changes = useMemo(() => new TaskCardStore(task), [task]);

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      offset={8}
      radius="md"
      size="lg"
      style={
        {
          '--drawer-height': 'min(auto, 100%)',
        } as React.CSSProperties
      }
      styles={{ body: { padding: 0 } }}
      withCloseButton={false}
    >
      <Flex direction="column" pt="xs">
        <TaskFieldFormItem>
          <Textarea
            value={changes.actual.title}
            onChange={e => {
              changes.setStringValue(`title`, e.target.value);
            }}
            autosize
            minRows={1}
            autoFocus={false}
            styles={{
              input: {
                '--input-height': '1rem',
                border: `none`,
                outline: `none`,
                ...theme.headings.sizes.h4,
                fontWeight: `bold`,
                ...editableLabelDecoration,
                padding: 0,
              },
            }}
          />
        </TaskFieldFormItem>
        <TaskFieldFormItem>
          <Flex>
            <PrioritizingFormItem cardStore={changes} />
            <Flex direction="column" flex="1 0 auto">
              <DateTimeEditableItem
                title="Start After"
                value={new Date() || changes.actual.startAfter}
                onChange={e => {
                  console.log(e);
                }}
              />
              <DateTimeEditableItem
                title="Planned Start"
                value={changes.actual.plannedStart}
                onChange={e => {
                  console.log(e);
                }}
              />
              <DateTimeEditableItem
                title="Due To"
                value={changes.actual.dueTo}
                onChange={e => {
                  console.log(e);
                }}
              />
            </Flex>
          </Flex>
        </TaskFieldFormItem>
      </Flex>
    </Drawer>
  );
});

export const RootContentView = observer(function RootContentView() {
  const storage = useStorage();

  const task = useMemo(
    () => computed(() => storage.tasks.actualTasks.get([...storage.tasks.actualTasks.keys()][0])),
    [storage]
  );

  return (
    <>
      <ProvideDatesFormats value={{ dateFormat: `DD.MM.YYYY`, timeFormat: `HH:mm` }}>
        {task.get() && <TaskEditForm task={() => notNull(task.get())} />}
      </ProvideDatesFormats>

      <Flex direction="column">
        {sortBy([...storage.tasks.actualTasks.values()], t => t.orderKey).map(t => (
          <Paper key={t.id} p={8} withBorder>
            {t.title}
          </Paper>
        ))}
      </Flex>
    </>
  );
});
