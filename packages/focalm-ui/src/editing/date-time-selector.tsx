import { ActionIcon, Flex } from '@mantine/core';
import { Calendar, TimePicker } from '@mantine/dates';
import { IconCheck } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';

import { secondsOffsetToString, timeStringToSecondsOffset } from '../utils/seconds-offset';

export type DateTimeSelectorProps = {
  date: string | null | undefined;
  timeOffset: number | null | undefined;
  onChange(date: string | null, timeOffset: number | null): void | boolean;
};

export const DateTimeSelector = observer<DateTimeSelectorProps & { close: () => void }>(
  function DateTimeSelector({ date, timeOffset, onChange, close }) {
    const [updatedValues, setUpdatedValues] = useState<{ date?: string | null; offset?: number | null }>(
      () => ({})
    );

    const { onChangeTime, timeStr, submit, getDayProps } = useMemo(() => {
      const actualOffset = updatedValues.offset === undefined ? timeOffset : updatedValues.offset;
      const actualDate = updatedValues.date === undefined ? date : updatedValues.date;
      return {
        timeStr:
          actualOffset != null ? secondsOffsetToString(actualOffset, { s: false, ms: false }) : undefined,
        onChangeTime: (e: string | null) => {
          setUpdatedValues(o => ({ ...o, offset: e ? timeStringToSecondsOffset(e) : null }));
        },
        getDayProps: (v: string) =>
          ({
            selected: dayjs(v).isSame(actualDate, 'date'),
            onClick: () => setUpdatedValues(o => ({ ...o, date: new Date(v).toISOString().split(`T`)[0] })),
          }) as const,
        submit: () => {
          if (onChange(actualDate ?? null, actualOffset ?? null) !== false) {
            close();
          }
        },
      };
    }, [timeOffset, date, updatedValues]);

    return (
      <Flex direction="column" gap="xs" align="stretch">
        <Calendar getDayProps={getDayProps} />
        <Flex gap="xs" align="end">
          <TimePicker flex="1 0 auto" clearable value={timeStr} onChange={onChangeTime} />
          <ActionIcon size="xl" variant="subtle" onClick={submit}>
            <IconCheck />
          </ActionIcon>
        </Flex>
      </Flex>
    );
  }
);
