import { z } from 'zod';

import { StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileDeleteOneSchema = z.object({
  select: StoredFileSelectObjectSchema.optional(),
  include: StoredFileIncludeObjectSchema.optional(),
  where: StoredFileWhereUniqueInputObjectSchema,
});
