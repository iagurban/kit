import { registerEnumType } from '@nestjs/graphql';

export enum RefreshTokenOrderByRelevanceFieldEnum {
  id = 'id',
  userId = 'userId',
  hash = 'hash',
}

registerEnumType(RefreshTokenOrderByRelevanceFieldEnum, {
  name: 'RefreshTokenOrderByRelevanceFieldEnum',
  description: undefined,
});
