import { z } from 'zod';

import { MenuScalarFieldEnumSchema } from './enums/MenuScalarFieldEnum.schema';
import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuOrderByWithRelationInputObjectSchema } from './objects/MenuOrderByWithRelationInput.schema';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuWhereInputObjectSchema } from './objects/MenuWhereInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';

export const MenuFindManySchema = z.object({
  select: z.lazy(() => MenuSelectObjectSchema.optional()),
  include: z.lazy(() => MenuIncludeObjectSchema.optional()),
  orderBy: z
    .union([MenuOrderByWithRelationInputObjectSchema, MenuOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: MenuWhereInputObjectSchema.optional(),
  cursor: MenuWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(MenuScalarFieldEnumSchema).optional(),
});
