import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryGroupScalarFieldEnum {
  id = 'id',
  taskId = 'taskId',
  authorId = 'authorId',
  localCreatedAt = 'localCreatedAt',
  createdAt = 'createdAt',
  createdAtFixReason = 'createdAtFixReason',
}

registerEnumType(TaskHistoryGroupScalarFieldEnum, {
  name: 'TaskHistoryGroupScalarFieldEnum',
  description: undefined,
});
