import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryValueScalarFieldEnum {
  groupId = 'groupId',
  taskId = 'taskId',
  key = 'key',
  value = 'value',
}

registerEnumType(TaskHistoryValueScalarFieldEnum, {
  name: 'TaskHistoryValueScalarFieldEnum',
  description: undefined,
});
