import { z } from 'zod';

import { ItemCreateInputObjectSchema } from './objects/ItemCreateInput.schema';
import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemUncheckedCreateInputObjectSchema } from './objects/ItemUncheckedCreateInput.schema';
import { ItemUncheckedUpdateInputObjectSchema } from './objects/ItemUncheckedUpdateInput.schema';
import { ItemUpdateInputObjectSchema } from './objects/ItemUpdateInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';

export const ItemUpsertSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  where: ItemWhereUniqueInputObjectSchema,
  create: z.union([ItemCreateInputObjectSchema, ItemUncheckedCreateInputObjectSchema]),
  update: z.union([ItemUpdateInputObjectSchema, ItemUncheckedUpdateInputObjectSchema]),
});
