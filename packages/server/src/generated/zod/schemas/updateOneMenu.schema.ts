import { z } from 'zod';

import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuUncheckedUpdateInputObjectSchema } from './objects/MenuUncheckedUpdateInput.schema';
import { MenuUpdateInputObjectSchema } from './objects/MenuUpdateInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';

export const MenuUpdateOneSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  data: z.union([MenuUpdateInputObjectSchema, MenuUncheckedUpdateInputObjectSchema]),
  where: MenuWhereUniqueInputObjectSchema,
});
