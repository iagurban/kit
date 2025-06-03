import { registerEnumType } from '@nestjs/graphql';

export enum TaskScalarFieldEnum {
  id = 'id',
  title = 'title',
  state = 'state',
  archived = 'archived',
  impact = 'impact',
  ease = 'ease',
  startAfter = 'startAfter',
  plannedStart = 'plannedStart',
  dueTo = 'dueTo',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  authorId = 'authorId',
  responsibleId = 'responsibleId',
  parentId = 'parentId',
  orderKey = 'orderKey',
}

registerEnumType(TaskScalarFieldEnum, { name: 'TaskScalarFieldEnum', description: undefined });
