import { z } from 'zod';
import { MenuUpdateManyMutationInputObjectSchema } from './objects/MenuUpdateManyMutationInput.schema';
import { MenuWhereInputObjectSchema } from './objects/MenuWhereInput.schema';

export const MenuUpdateManySchema = z.object({
  data: MenuUpdateManyMutationInputObjectSchema,
  where: MenuWhereInputObjectSchema.optional(),
});
