import { z } from 'zod';

import { ItemScalarFieldEnumSchema } from './enums/ItemScalarFieldEnum.schema';
import { ItemOrderByWithAggregationInputObjectSchema } from './objects/ItemOrderByWithAggregationInput.schema';
import { ItemScalarWhereWithAggregatesInputObjectSchema } from './objects/ItemScalarWhereWithAggregatesInput.schema';
import { ItemWhereInputObjectSchema } from './objects/ItemWhereInput.schema';

export const ItemGroupBySchema = z.object({
  where: ItemWhereInputObjectSchema.optional(),
  orderBy: z
    .union([ItemOrderByWithAggregationInputObjectSchema, ItemOrderByWithAggregationInputObjectSchema.array()])
    .optional(),
  having: ItemScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(ItemScalarFieldEnumSchema),
});
