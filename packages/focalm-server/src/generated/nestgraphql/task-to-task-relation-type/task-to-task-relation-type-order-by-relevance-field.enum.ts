import { registerEnumType } from '@nestjs/graphql';

export enum TaskToTaskRelationTypeOrderByRelevanceFieldEnum {
  id = 'id',
  forward = 'forward',
  inverse = 'inverse',
  projectId = 'projectId',
}

registerEnumType(TaskToTaskRelationTypeOrderByRelevanceFieldEnum, {
  name: 'TaskToTaskRelationTypeOrderByRelevanceFieldEnum',
  description: undefined,
});
