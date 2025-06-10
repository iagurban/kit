import { z } from 'zod';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemUpdateInputObjectSchema } from './objects/ItemUpdateInput.schema';
import { ItemUncheckedUpdateInputObjectSchema } from './objects/ItemUncheckedUpdateInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';

export const ItemUpdateOneSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  data: z.union([ItemUpdateInputObjectSchema, ItemUncheckedUpdateInputObjectSchema]),
  where: ItemWhereUniqueInputObjectSchema,
});
