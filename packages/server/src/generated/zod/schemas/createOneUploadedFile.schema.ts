import { z } from 'zod';
import { UploadedFileSelectObjectSchema } from './objects/UploadedFileSelect.schema';
import { UploadedFileIncludeObjectSchema } from './objects/UploadedFileInclude.schema';
import { UploadedFileCreateInputObjectSchema } from './objects/UploadedFileCreateInput.schema';
import { UploadedFileUncheckedCreateInputObjectSchema } from './objects/UploadedFileUncheckedCreateInput.schema';

export const UploadedFileCreateOneSchema = z.object({
  select: UploadedFileSelectObjectSchema.optional(),
  include: UploadedFileIncludeObjectSchema.optional(),
  data: z.union([UploadedFileCreateInputObjectSchema, UploadedFileUncheckedCreateInputObjectSchema]),
});
