import { z } from 'zod';

import { StoredFileScalarFieldEnumSchema } from './enums/StoredFileScalarFieldEnum.schema';
import { StoredFileOrderByWithAggregationInputObjectSchema } from './objects/StoredFileOrderByWithAggregationInput.schema';
import { StoredFileScalarWhereWithAggregatesInputObjectSchema } from './objects/StoredFileScalarWhereWithAggregatesInput.schema';
import { StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';

export const StoredFileGroupBySchema = z.object({
  where: StoredFileWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      StoredFileOrderByWithAggregationInputObjectSchema,
      StoredFileOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: StoredFileScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(StoredFileScalarFieldEnumSchema),
});
