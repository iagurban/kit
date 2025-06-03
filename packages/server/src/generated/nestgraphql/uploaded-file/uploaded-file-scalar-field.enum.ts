import { registerEnumType } from '@nestjs/graphql';

export enum UploadedFileScalarFieldEnum {
  id = 'id',
  originalName = 'originalName',
  mimetype = 'mimetype',
  uploadedAt = 'uploadedAt',
  uploaderId = 'uploaderId',
  storedFileId = 'storedFileId',
  menuId = 'menuId',
}

registerEnumType(UploadedFileScalarFieldEnum, {
  name: 'UploadedFileScalarFieldEnum',
  description: undefined,
});
