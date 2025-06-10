import { z } from 'zod';
import { MenuSelectObjectSchema } from './objects/MenuSelect.schema';
import { MenuIncludeObjectSchema } from './objects/MenuInclude.schema';
import { MenuOrderByWithRelationInputObjectSchema } from './objects/MenuOrderByWithRelationInput.schema';
import { MenuWhereInputObjectSchema } from './objects/MenuWhereInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';
import { MenuScalarFieldEnumSchema } from './enums/MenuScalarFieldEnum.schema';

export const MenuFindFirstSchema = z.object({
  select: MenuSelectObjectSchema.optional(),
  include: MenuIncludeObjectSchema.optional(),
  orderBy: z
    .union([MenuOrderByWithRelationInputObjectSchema, MenuOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: MenuWhereInputObjectSchema.optional(),
  cursor: MenuWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(MenuScalarFieldEnumSchema).optional(),
});
