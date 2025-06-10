import { z } from 'zod';
import { UploadedFileSelectObjectSchema } from './objects/UploadedFileSelect.schema';
import { UploadedFileIncludeObjectSchema } from './objects/UploadedFileInclude.schema';
import { UploadedFileUpdateInputObjectSchema } from './objects/UploadedFileUpdateInput.schema';
import { UploadedFileUncheckedUpdateInputObjectSchema } from './objects/UploadedFileUncheckedUpdateInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './objects/UploadedFileWhereUniqueInput.schema';

export const UploadedFileUpdateOneSchema = z.object({
  select: UploadedFileSelectObjectSchema.optional(),
  include: UploadedFileIncludeObjectSchema.optional(),
  data: z.union([UploadedFileUpdateInputObjectSchema, UploadedFileUncheckedUpdateInputObjectSchema]),
  where: UploadedFileWhereUniqueInputObjectSchema,
});
