import { registerEnumType } from '@nestjs/graphql';

export enum TaskOrderByRelevanceFieldEnum {
  id = 'id',
  title = 'title',
  authorId = 'authorId',
  responsibleId = 'responsibleId',
  parentId = 'parentId',
  orderKey = 'orderKey',
  projectId = 'projectId',
}

registerEnumType(TaskOrderByRelevanceFieldEnum, {
  name: 'TaskOrderByRelevanceFieldEnum',
  description: undefined,
});
