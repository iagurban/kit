import { registerEnumType } from '@nestjs/graphql';

export enum UploadStatus {
  ACTIVE = 'ACTIVE',
  FINALIZING = 'FINALIZING',
  FAILED = 'FAILED',
}

registerEnumType(UploadStatus, { name: 'UploadStatus', description: undefined });
