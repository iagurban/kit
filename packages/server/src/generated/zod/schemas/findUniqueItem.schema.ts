import { z } from 'zod';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';

export const ItemFindUniqueSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  where: ItemWhereUniqueInputObjectSchema,
});
