import { z } from 'zod';

import { ItemIncludeObjectSchema } from './objects/ItemInclude.schema';
import { ItemSelectObjectSchema } from './objects/ItemSelect.schema';
import { ItemWhereUniqueInputObjectSchema } from './objects/ItemWhereUniqueInput.schema';

export const ItemFindUniqueSchema = z.object({
  select: ItemSelectObjectSchema.optional(),
  include: ItemIncludeObjectSchema.optional(),
  where: ItemWhereUniqueInputObjectSchema,
});
