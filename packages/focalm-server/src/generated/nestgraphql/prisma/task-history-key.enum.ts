import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryKey {
  title = 'title',
  state = 'state',
  archived = 'archived',
  impact = 'impact',
  ease = 'ease',
  authorId = 'authorId',
  responsibleId = 'responsibleId',
  participants = 'participants',
  orderKey = 'orderKey',
  parentId = 'parentId',
  startAfterDate = 'startAfterDate',
  startAfterOffset = 'startAfterOffset',
  plannedStartDate = 'plannedStartDate',
  plannedStartOffset = 'plannedStartOffset',
  dueToDate = 'dueToDate',
  dueToOffset = 'dueToOffset',
}

registerEnumType(TaskHistoryKey, { name: 'TaskHistoryKey', description: undefined });
