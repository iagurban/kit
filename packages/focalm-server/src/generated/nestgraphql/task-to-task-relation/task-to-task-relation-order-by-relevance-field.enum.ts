import { registerEnumType } from '@nestjs/graphql';

export enum TaskToTaskRelationOrderByRelevanceFieldEnum {
  srcId = 'srcId',
  dstId = 'dstId',
  typeId = 'typeId',
}

registerEnumType(TaskToTaskRelationOrderByRelevanceFieldEnum, {
  name: 'TaskToTaskRelationOrderByRelevanceFieldEnum',
  description: undefined,
});
