import { z } from 'zod';

import { StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileUncheckedUpdateInputObjectSchema } from './objects/StoredFileUncheckedUpdateInput.schema';
import { StoredFileUpdateInputObjectSchema } from './objects/StoredFileUpdateInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileUpdateOneSchema = z.object({
  select: StoredFileSelectObjectSchema.optional(),
  include: StoredFileIncludeObjectSchema.optional(),
  data: z.union([StoredFileUpdateInputObjectSchema, StoredFileUncheckedUpdateInputObjectSchema]),
  where: StoredFileWhereUniqueInputObjectSchema,
});
