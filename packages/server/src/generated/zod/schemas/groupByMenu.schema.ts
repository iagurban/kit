import { z } from 'zod';
import { MenuWhereInputObjectSchema } from './objects/MenuWhereInput.schema';
import { MenuOrderByWithAggregationInputObjectSchema } from './objects/MenuOrderByWithAggregationInput.schema';
import { MenuScalarWhereWithAggregatesInputObjectSchema } from './objects/MenuScalarWhereWithAggregatesInput.schema';
import { MenuScalarFieldEnumSchema } from './enums/MenuScalarFieldEnum.schema';

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
