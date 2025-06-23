import { registerEnumType } from '@nestjs/graphql';

export enum UserInProjectOrderByRelevanceFieldEnum {
  userId = 'userId',
  projectId = 'projectId',
}

registerEnumType(UserInProjectOrderByRelevanceFieldEnum, {
  name: 'UserInProjectOrderByRelevanceFieldEnum',
  description: undefined,
});
