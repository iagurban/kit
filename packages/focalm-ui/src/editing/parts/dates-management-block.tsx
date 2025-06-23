import { Box, Flex } from '@mantine/core';
import { observer } from 'mobx-react-lite';

import { DateTimeEditableInput } from '../../components/date-time-editable-input';
import { DateTimeSelectorProps } from '../../components/date-time-selector';
import { TaskCardStore } from '../../storage/task-card-store';

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

export const DatesManagementBlock = observer<{
  card: TaskCardStore;
}>(function DatesManagementBlock({ card }) {
  return (
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
  );
});
