import { z } from 'zod';

import { MenuCreateInputObjectSchema } from './objects/MenuCreateInput.schema';
import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuUncheckedCreateInputObjectSchema } from './objects/MenuUncheckedCreateInput.schema';
import { MenuUncheckedUpdateInputObjectSchema } from './objects/MenuUncheckedUpdateInput.schema';
import { MenuUpdateInputObjectSchema } from './objects/MenuUpdateInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';

export const MenuUpsertSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  where: MenuWhereUniqueInputObjectSchema,
  create: z.union([MenuCreateInputObjectSchema, MenuUncheckedCreateInputObjectSchema]),
  update: z.union([MenuUpdateInputObjectSchema, MenuUncheckedUpdateInputObjectSchema]),
});
