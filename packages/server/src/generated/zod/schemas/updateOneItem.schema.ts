import { z } from 'zod';

import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemUncheckedUpdateInputObjectSchema } from './objects/ItemUncheckedUpdateInput.schema';
import { ItemUpdateInputObjectSchema } from './objects/ItemUpdateInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';

export const ItemUpdateOneSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  data: z.union([ItemUpdateInputObjectSchema, ItemUncheckedUpdateInputObjectSchema]),
  where: ItemWhereUniqueInputObjectSchema,
});
