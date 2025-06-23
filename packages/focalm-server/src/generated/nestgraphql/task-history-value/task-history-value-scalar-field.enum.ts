import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryValueScalarFieldEnum {
  id = 'id',
  groupId = 'groupId',
  taskId = 'taskId',
  key = 'key',
  op = 'op',
  value = 'value',
}

registerEnumType(TaskHistoryValueScalarFieldEnum, {
  name: 'TaskHistoryValueScalarFieldEnum',
  description: undefined,
});
