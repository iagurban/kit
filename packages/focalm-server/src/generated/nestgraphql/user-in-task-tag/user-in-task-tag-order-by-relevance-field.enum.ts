import { registerEnumType } from '@nestjs/graphql';

export enum UserInTaskTagOrderByRelevanceFieldEnum {
  userInTaskId = 'userInTaskId',
  roleId = 'roleId',
}

registerEnumType(UserInTaskTagOrderByRelevanceFieldEnum, {
  name: 'UserInTaskTagOrderByRelevanceFieldEnum',
  description: undefined,
});
