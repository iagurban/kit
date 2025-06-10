import { z } from 'zod';
import { StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileCreateInputObjectSchema } from './objects/StoredFileCreateInput.schema';
import { StoredFileUncheckedCreateInputObjectSchema } from './objects/StoredFileUncheckedCreateInput.schema';

export const StoredFileCreateOneSchema = z.object({
  select: StoredFileSelectObjectSchema.optional(),
  include: StoredFileIncludeObjectSchema.optional(),
  data: z.union([StoredFileCreateInputObjectSchema, StoredFileUncheckedCreateInputObjectSchema]),
});
