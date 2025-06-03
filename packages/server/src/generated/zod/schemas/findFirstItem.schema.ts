import { z } from 'zod';

import { ItemScalarFieldEnumSchema } from './enums/ItemScalarFieldEnum.schema';
import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemOrderByWithRelationInputObjectSchema } from './objects/ItemOrderByWithRelationInput.schema';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemWhereInputObjectSchema } from './objects/ItemWhereInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';

export const ItemFindFirstSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  orderBy: z
    .union([ItemOrderByWithRelationInputObjectSchema, ItemOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: ItemWhereInputObjectSchema.optional(),
  cursor: ItemWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ItemScalarFieldEnumSchema).optional(),
});
