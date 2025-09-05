import { registerEnumType } from '@nestjs/graphql';

export enum StoredFileOrderByRelevanceFieldEnum {
  id = 'id',
  hash = 'hash',
}

registerEnumType(StoredFileOrderByRelevanceFieldEnum, {
  name: 'StoredFileOrderByRelevanceFieldEnum',
  description: undefined,
});
