import { registerEnumType } from '@nestjs/graphql';

export enum UploadedFileOrderByRelevanceFieldEnum {
  id = 'id',
  originalName = 'originalName',
  mimetype = 'mimetype',
  uploaderId = 'uploaderId',
  storedFileId = 'storedFileId',
}

registerEnumType(UploadedFileOrderByRelevanceFieldEnum, {
  name: 'UploadedFileOrderByRelevanceFieldEnum',
  description: undefined,
});
