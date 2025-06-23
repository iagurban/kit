import { registerEnumType } from '@nestjs/graphql';

export enum TaskScalarFieldEnum {
  id = 'id',
  title = 'title',
  state = 'state',
  archived = 'archived',
  impact = 'impact',
  ease = 'ease',
  startAfterDate = 'startAfterDate',
  startAfterOffset = 'startAfterOffset',
  plannedStartDate = 'plannedStartDate',
  plannedStartOffset = 'plannedStartOffset',
  dueToDate = 'dueToDate',
  dueToOffset = 'dueToOffset',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  authorId = 'authorId',
  responsibleId = 'responsibleId',
  parentId = 'parentId',
  description = 'description',
  orderKey = 'orderKey',
  projectId = 'projectId',
  nnInProject = 'nnInProject',
}

registerEnumType(TaskScalarFieldEnum, { name: 'TaskScalarFieldEnum', description: undefined });
