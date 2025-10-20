import { registerEnumType } from '@nestjs/graphql';

export enum UserOrderByRelevanceFieldEnum {
  id = 'id',
  email = 'email',
  name = 'name',
  abbrev = 'abbrev',
}

registerEnumType(UserOrderByRelevanceFieldEnum, {
  name: 'UserOrderByRelevanceFieldEnum',
  description: undefined,
});
