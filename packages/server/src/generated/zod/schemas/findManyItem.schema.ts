import { z } from 'zod';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemOrderByWithRelationInputObjectSchema } from './objects/ItemOrderByWithRelationInput.schema';
import { ItemWhereInputObjectSchema } from './objects/ItemWhereInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';
import { ItemScalarFieldEnumSchema } from './enums/ItemScalarFieldEnum.schema';

export const ItemFindManySchema = z.object({
  select: z.lazy(() => ItemSelectObjectSchema.optional()),
  include: z.lazy(() => ItemIncludeObjectSchema.optional()),
  orderBy: z
    .union([ItemOrderByWithRelationInputObjectSchema, ItemOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: ItemWhereInputObjectSchema.optional(),
  cursor: ItemWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ItemScalarFieldEnumSchema).optional(),
});
