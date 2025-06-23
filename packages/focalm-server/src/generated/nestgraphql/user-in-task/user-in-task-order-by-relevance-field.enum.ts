import { registerEnumType } from '@nestjs/graphql';

export enum UserInTaskOrderByRelevanceFieldEnum {
  id = 'id',
  userId = 'userId',
  taskId = 'taskId',
}

registerEnumType(UserInTaskOrderByRelevanceFieldEnum, {
  name: 'UserInTaskOrderByRelevanceFieldEnum',
  description: undefined,
});
