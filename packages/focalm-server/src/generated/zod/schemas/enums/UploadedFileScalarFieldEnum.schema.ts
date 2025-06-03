import { z } from 'zod';

export const UploadedFileScalarFieldEnumSchema = z.enum([
  'id',
  'originalName',
  'mimetype',
  'uploadedAt',
  'uploaderId',
  'storedFileId',
]);
