import { z } from 'zod';

import { StoredFileCreateInputObjectSchema } from './objects/StoredFileCreateInput.schema';
import { StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileUncheckedCreateInputObjectSchema } from './objects/StoredFileUncheckedCreateInput.schema';
import { StoredFileUncheckedUpdateInputObjectSchema } from './objects/StoredFileUncheckedUpdateInput.schema';
import { StoredFileUpdateInputObjectSchema } from './objects/StoredFileUpdateInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileUpsertSchema = z.object({
  select: StoredFileSelectObjectSchema.optional(),
  include: StoredFileIncludeObjectSchema.optional(),
  where: StoredFileWhereUniqueInputObjectSchema,
  create: z.union([StoredFileCreateInputObjectSchema, StoredFileUncheckedCreateInputObjectSchema]),
  update: z.union([StoredFileUpdateInputObjectSchema, StoredFileUncheckedUpdateInputObjectSchema]),
});
