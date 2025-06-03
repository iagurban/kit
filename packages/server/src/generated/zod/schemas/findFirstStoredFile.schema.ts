import { z } from 'zod';

import { StoredFileScalarFieldEnumSchema } from './enums/StoredFileScalarFieldEnum.schema';
import { StoredFileIncludeObjectSchema } from './objects/StoredFileInclude.schema';
import { StoredFileOrderByWithRelationInputObjectSchema } from './objects/StoredFileOrderByWithRelationInput.schema';
import { StoredFileSelectObjectSchema } from './objects/StoredFileSelect.schema';
import { StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';

export const StoredFileFindFirstSchema = z.object({
  select: StoredFileSelectObjectSchema.optional(),
  include: StoredFileIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      StoredFileOrderByWithRelationInputObjectSchema,
      StoredFileOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: StoredFileWhereInputObjectSchema.optional(),
  cursor: StoredFileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(StoredFileScalarFieldEnumSchema).optional(),
});
