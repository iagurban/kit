import { z } from 'zod';
import { UploadedFileSelectObjectSchema } from './objects/UploadedFileSelect.schema';
import { UploadedFileIncludeObjectSchema } from './objects/UploadedFileInclude.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './objects/UploadedFileWhereUniqueInput.schema';
import { UploadedFileCreateInputObjectSchema } from './objects/UploadedFileCreateInput.schema';
import { UploadedFileUncheckedCreateInputObjectSchema } from './objects/UploadedFileUncheckedCreateInput.schema';
import { UploadedFileUpdateInputObjectSchema } from './objects/UploadedFileUpdateInput.schema';
import { UploadedFileUncheckedUpdateInputObjectSchema } from './objects/UploadedFileUncheckedUpdateInput.schema';

export const UploadedFileUpsertSchema = z.object({
  select: UploadedFileSelectObjectSchema.optional(),
  include: UploadedFileIncludeObjectSchema.optional(),
  where: UploadedFileWhereUniqueInputObjectSchema,
  create: z.union([UploadedFileCreateInputObjectSchema, UploadedFileUncheckedCreateInputObjectSchema]),
  update: z.union([UploadedFileUpdateInputObjectSchema, UploadedFileUncheckedUpdateInputObjectSchema]),
});
