import { z } from 'zod';

import { MenuCreateInputObjectSchema } from './objects/MenuCreateInput.schema';
import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuUncheckedCreateInputObjectSchema } from './objects/MenuUncheckedCreateInput.schema';

export const MenuCreateOneSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  data: z.union([MenuCreateInputObjectSchema, MenuUncheckedCreateInputObjectSchema]),
});
