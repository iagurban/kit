import { z } from 'zod';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';
import { ItemCreateInputObjectSchema } from './objects/ItemCreateInput.schema';
import { ItemUncheckedCreateInputObjectSchema } from './objects/ItemUncheckedCreateInput.schema';
import { ItemUpdateInputObjectSchema } from './objects/ItemUpdateInput.schema';
import { ItemUncheckedUpdateInputObjectSchema } from './objects/ItemUncheckedUpdateInput.schema';

export const ItemUpsertSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  where: ItemWhereUniqueInputObjectSchema,
  create: z.union([ItemCreateInputObjectSchema, ItemUncheckedCreateInputObjectSchema]),
  update: z.union([ItemUpdateInputObjectSchema, ItemUncheckedUpdateInputObjectSchema]),
});
