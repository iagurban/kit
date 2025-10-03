import { registerEnumType } from '@nestjs/graphql';

export enum UploadChunkScalarFieldEnum {
  id = 'id',
  sessionId = 'sessionId',
  partNumber = 'partNumber',
  eTag = 'eTag',
  leasedAt = 'leasedAt',
}

registerEnumType(UploadChunkScalarFieldEnum, { name: 'UploadChunkScalarFieldEnum', description: undefined });
