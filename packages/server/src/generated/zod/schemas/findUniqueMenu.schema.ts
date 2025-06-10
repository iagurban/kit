import { z } from 'zod';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';

export const MenuFindUniqueSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  where: MenuWhereUniqueInputObjectSchema,
});
