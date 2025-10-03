import { registerEnumType } from '@nestjs/graphql';

export enum UploadSessionOrderByRelevanceFieldEnum {
  id = 'id',
  storageUploadId = 'storageUploadId',
  fileId = 'fileId',
  failReason = 'failReason',
}

registerEnumType(UploadSessionOrderByRelevanceFieldEnum, {
  name: 'UploadSessionOrderByRelevanceFieldEnum',
  description: undefined,
});
