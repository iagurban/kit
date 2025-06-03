import { z } from 'zod';

import { MenuWhereInputObjectSchema } from './objects/MenuWhereInput.schema';

export const MenuDeleteManySchema = z.object({ where: MenuWhereInputObjectSchema.optional() });
