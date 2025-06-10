import { z } from 'zod';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemCreateInputObjectSchema } from './objects/ItemCreateInput.schema';
import { ItemUncheckedCreateInputObjectSchema } from './objects/ItemUncheckedCreateInput.schema';

export const ItemCreateOneSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  data: z.union([ItemCreateInputObjectSchema, ItemUncheckedCreateInputObjectSchema]),
});
