import { z } from 'zod';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuCreateInputObjectSchema } from './objects/MenuCreateInput.schema';
import { MenuUncheckedCreateInputObjectSchema } from './objects/MenuUncheckedCreateInput.schema';

export const MenuCreateOneSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  data: z.union([MenuCreateInputObjectSchema, MenuUncheckedCreateInputObjectSchema]),
});
