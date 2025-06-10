import { z } from 'zod';
import { UploadedFileSelectObjectSchema } from './objects/UploadedFileSelect.schema';
import { UploadedFileIncludeObjectSchema } from './objects/UploadedFileInclude.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './objects/UploadedFileWhereUniqueInput.schema';

export const UploadedFileDeleteOneSchema = z.object({
  select: UploadedFileSelectObjectSchema.optional(),
  include: UploadedFileIncludeObjectSchema.optional(),
  where: UploadedFileWhereUniqueInputObjectSchema,
});
