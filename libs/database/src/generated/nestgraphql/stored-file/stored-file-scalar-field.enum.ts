import { registerEnumType } from '@nestjs/graphql';

export enum StoredFileScalarFieldEnum {
  id = 'id',
  checksum = 'checksum',
  sizeBytes = 'sizeBytes',
  originalFilename = 'originalFilename',
  mimeType = 'mimeType',
  storageKey = 'storageKey',
  cdnUrl = 'cdnUrl',
  metadata = 'metadata',
  uploadedByUserId = 'uploadedByUserId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(StoredFileScalarFieldEnum, { name: 'StoredFileScalarFieldEnum', description: undefined });
