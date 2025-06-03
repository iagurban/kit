import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryKey {
  title = 'title',
  state = 'state',
  archived = 'archived',
  impact = 'impact',
  ease = 'ease',
  authorId = 'authorId',
  responsibleId = 'responsibleId',
  orderKey = 'orderKey',
  parentId = 'parentId',
}

registerEnumType(TaskHistoryKey, { name: 'TaskHistoryKey', description: undefined });
