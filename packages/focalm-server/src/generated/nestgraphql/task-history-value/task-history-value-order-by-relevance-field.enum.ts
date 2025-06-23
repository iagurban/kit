import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryValueOrderByRelevanceFieldEnum {
  id = 'id',
  groupId = 'groupId',
  taskId = 'taskId',
}

registerEnumType(TaskHistoryValueOrderByRelevanceFieldEnum, {
  name: 'TaskHistoryValueOrderByRelevanceFieldEnum',
  description: undefined,
});
