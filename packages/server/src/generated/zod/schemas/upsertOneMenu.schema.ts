import { z } from 'zod';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';
import { MenuCreateInputObjectSchema } from './objects/MenuCreateInput.schema';
import { MenuUncheckedCreateInputObjectSchema } from './objects/MenuUncheckedCreateInput.schema';
import { MenuUpdateInputObjectSchema } from './objects/MenuUpdateInput.schema';
import { MenuUncheckedUpdateInputObjectSchema } from './objects/MenuUncheckedUpdateInput.schema';

export const MenuUpsertSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  where: MenuWhereUniqueInputObjectSchema,
  create: z.union([MenuCreateInputObjectSchema, MenuUncheckedCreateInputObjectSchema]),
  update: z.union([MenuUpdateInputObjectSchema, MenuUncheckedUpdateInputObjectSchema]),
});
