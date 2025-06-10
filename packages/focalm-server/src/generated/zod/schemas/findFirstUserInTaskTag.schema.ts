import { z } from 'zod';

import { UserInTaskTagScalarFieldEnumSchema } from './enums/UserInTaskTagScalarFieldEnum.schema';
import { UserInTaskTagIncludeObjectSchema } from './objects/UserInTaskTagInclude.schema';
import { UserInTaskTagOrderByWithRelationInputObjectSchema } from './objects/UserInTaskTagOrderByWithRelationInput.schema';
import { UserInTaskTagSelectObjectSchema } from './objects/UserInTaskTagSelect.schema';
import { UserInTaskTagWhereInputObjectSchema } from './objects/UserInTaskTagWhereInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './objects/UserInTaskTagWhereUniqueInput.schema';

export const UserInTaskTagFindFirstSchema = z.object({
  select: UserInTaskTagSelectObjectSchema.optional(),
  include: UserInTaskTagIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      UserInTaskTagOrderByWithRelationInputObjectSchema,
      UserInTaskTagOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: UserInTaskTagWhereInputObjectSchema.optional(),
  cursor: UserInTaskTagWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(UserInTaskTagScalarFieldEnumSchema).optional(),
});
