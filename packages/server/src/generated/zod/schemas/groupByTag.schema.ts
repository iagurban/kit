import { z } from 'zod';

import { TagScalarFieldEnumSchema } from './enums/TagScalarFieldEnum.schema';
import { TagOrderByWithAggregationInputObjectSchema } from './objects/TagOrderByWithAggregationInput.schema';
import { TagScalarWhereWithAggregatesInputObjectSchema } from './objects/TagScalarWhereWithAggregatesInput.schema';
import { TagWhereInputObjectSchema } from './objects/TagWhereInput.schema';

export const TagGroupBySchema = z.object({
  where: TagWhereInputObjectSchema.optional(),
  orderBy: z
    .union([TagOrderByWithAggregationInputObjectSchema, TagOrderByWithAggregationInputObjectSchema.array()])
    .optional(),
  having: TagScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(TagScalarFieldEnumSchema),
});
