import { z } from 'zod';
import { MenuCreateManyInputObjectSchema } from './objects/MenuCreateManyInput.schema';

export const MenuCreateManySchema = z.object({
  data: z.union([MenuCreateManyInputObjectSchema, z.array(MenuCreateManyInputObjectSchema)]),
  skipDuplicates: z.boolean().optional(),
});
