import { z } from 'zod';
import { StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileDeleteOneSchema = z.object({
  select: StoredFileSelectObjectSchema.optional(),
  include: StoredFileIncludeObjectSchema.optional(),
  where: StoredFileWhereUniqueInputObjectSchema,
});
