import { registerEnumType } from '@nestjs/graphql';

export enum UserOrderByRelevanceFieldEnum {
  id = 'id',
  email = 'email',
  name = 'name',
  abbrev = 'abbrev',
  passwordHash = 'passwordHash',
  ownProjectId = 'ownProjectId',
}

registerEnumType(UserOrderByRelevanceFieldEnum, {
  name: 'UserOrderByRelevanceFieldEnum',
  description: undefined,
});
