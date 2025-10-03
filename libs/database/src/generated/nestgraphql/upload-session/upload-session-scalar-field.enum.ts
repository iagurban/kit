import { registerEnumType } from '@nestjs/graphql';

export enum UploadSessionScalarFieldEnum {
  id = 'id',
  storageUploadId = 'storageUploadId',
  fileId = 'fileId',
  totalChunks = 'totalChunks',
  status = 'status',
  failReason = 'failReason',
  totalFailureCount = 'totalFailureCount',
  createdAt = 'createdAt',
}

registerEnumType(UploadSessionScalarFieldEnum, {
  name: 'UploadSessionScalarFieldEnum',
  description: undefined,
});
