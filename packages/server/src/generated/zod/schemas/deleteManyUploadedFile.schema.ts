import { z } from 'zod';
import { UploadedFileWhereInputObjectSchema } from './objects/UploadedFileWhereInput.schema';

export const UploadedFileDeleteManySchema = z.object({
  where: UploadedFileWhereInputObjectSchema.optional(),
});
