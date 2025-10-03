import { registerEnumType } from '@nestjs/graphql';

export enum StoredFileOrderByRelevanceFieldEnum {
  id = 'id',
  checksum = 'checksum',
  originalFilename = 'originalFilename',
  mimeType = 'mimeType',
  storageKey = 'storageKey',
  cdnUrl = 'cdnUrl',
  uploadedByUserId = 'uploadedByUserId',
}

registerEnumType(StoredFileOrderByRelevanceFieldEnum, {
  name: 'StoredFileOrderByRelevanceFieldEnum',
  description: undefined,
});
