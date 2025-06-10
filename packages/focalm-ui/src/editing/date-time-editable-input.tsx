import { Box, Popover } from '@mantine/core';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';

import classNames from '../app.module.scss';
import { useDatesFormats } from '../utils/react-contexts';
import { secondsOffsetToString } from '../utils/seconds-offset';
import { DateTimeSelector, DateTimeSelectorProps } from './date-time-selector';
import { editableLabelDecoration } from './title-input';

export const DateTimeEditableInput = observer<DateTimeSelectorProps>(function DateTimeEditableInput({
  date,
  timeOffset,
  onChange,
}) {
  const ctx = useDatesFormats();
  const parsed = useMemo(
    () =>
      (v =>
        v.isValid()
          ? {
              dateStr: v.format(ctx.dateFormat),
              timeStr: timeOffset != null ? secondsOffsetToString(timeOffset, { s: false, ms: false }) : null,
            }
          : null)(dayjs(date)),
    [ctx, date, timeOffset]
  );

  const [opened, setOpened] = useState(false);
  const { onOpen, onClose } = useMemo(
    () => ({
      onClose: () => setOpened(false),
      onOpen: () => setOpened(true),
    }),
    [setOpened]
  );
  return (
    <Popover
      opened={opened}
      onOpen={onOpen}
      onClose={onClose}
      onDismiss={onClose}
      // clickOutsideEvents={['mouseup', 'touchend']}
      trapFocus
      withArrow
      arrowSize={14}
      classNames={{ arrow: classNames.popoverArrow, dropdown: classNames.popoverDropdown }}
    >
      <Popover.Dropdown>
        <DateTimeSelector date={date} timeOffset={timeOffset} onChange={onChange} close={onClose} />
      </Popover.Dropdown>
      <Popover.Target>
        <Box display="inline" onClick={onOpen}>
          {parsed ? (
            <>
              <Box display="inline" style={{ ...editableLabelDecoration }}>
                {parsed.dateStr}
              </Box>
              {` `}
              <Box display="inline" style={{ ...editableLabelDecoration }}>
                {parsed.timeStr}
              </Box>
            </>
          ) : (
            <Box style={{ ...editableLabelDecoration }}>{`<None>`}</Box>
          )}
        </Box>
      </Popover.Target>
    </Popover>
  );
});
