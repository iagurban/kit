import { registerEnumType } from '@nestjs/graphql';

export enum TaskHistoryGroupOrderByRelevanceFieldEnum {
  id = 'id',
  authorId = 'authorId',
}

registerEnumType(TaskHistoryGroupOrderByRelevanceFieldEnum, {
  name: 'TaskHistoryGroupOrderByRelevanceFieldEnum',
  description: undefined,
});
