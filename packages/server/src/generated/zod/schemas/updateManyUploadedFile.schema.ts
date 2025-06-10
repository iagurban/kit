import { z } from 'zod';
import { UploadedFileUpdateManyMutationInputObjectSchema } from './objects/UploadedFileUpdateManyMutationInput.schema';
import { UploadedFileWhereInputObjectSchema } from './objects/UploadedFileWhereInput.schema';

export const UploadedFileUpdateManySchema = z.object({
  data: UploadedFileUpdateManyMutationInputObjectSchema,
  where: UploadedFileWhereInputObjectSchema.optional(),
});
