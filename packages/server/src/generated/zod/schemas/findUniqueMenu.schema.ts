import { z } from 'zod';

import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';

export const MenuFindUniqueSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  where: MenuWhereUniqueInputObjectSchema,
});
