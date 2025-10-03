import { registerEnumType } from '@nestjs/graphql';

export enum UploadChunkOrderByRelevanceFieldEnum {
  id = 'id',
  sessionId = 'sessionId',
  eTag = 'eTag',
}

registerEnumType(UploadChunkOrderByRelevanceFieldEnum, {
  name: 'UploadChunkOrderByRelevanceFieldEnum',
  description: undefined,
});
