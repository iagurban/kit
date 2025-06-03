import { z } from 'zod';

import { MenuScalarFieldEnumSchema } from './enums/MenuScalarFieldEnum.schema';
import { MenuOrderByWithAggregationInputObjectSchema } from './objects/MenuOrderByWithAggregationInput.schema';
import { MenuScalarWhereWithAggregatesInputObjectSchema } from './objects/MenuScalarWhereWithAggregatesInput.schema';
import { MenuWhereInputObjectSchema } from './objects/MenuWhereInput.schema';

export const MenuGroupBySchema = z.object({
  where: MenuWhereInputObjectSchema.optional(),
  orderBy: z
    .union([MenuOrderByWithAggregationInputObjectSchema, MenuOrderByWithAggregationInputObjectSchema.array()])
    .optional(),
  having: MenuScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(MenuScalarFieldEnumSchema),
});
