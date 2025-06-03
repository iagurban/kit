import { z } from 'zod';

import { UploadedFileIncludeObjectSchema } from './objects/UploadedFileInclude.schema';
import { UploadedFileSelectObjectSchema } from './objects/UploadedFileSelect.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './objects/UploadedFileWhereUniqueInput.schema';

export const UploadedFileFindUniqueSchema = z.object({
  select: UploadedFileSelectObjectSchema.optional(),
  include: UploadedFileIncludeObjectSchema.optional(),
  where: UploadedFileWhereUniqueInputObjectSchema,
});
