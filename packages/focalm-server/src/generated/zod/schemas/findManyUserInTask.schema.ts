import { z } from 'zod';

import { UserInTaskScalarFieldEnumSchema } from './enums/UserInTaskScalarFieldEnum.schema';
import { UserInTaskIncludeObjectSchema } from './objects/UserInTaskInclude.schema';
import { UserInTaskOrderByWithRelationInputObjectSchema } from './objects/UserInTaskOrderByWithRelationInput.schema';
import { UserInTaskSelectObjectSchema } from './objects/UserInTaskSelect.schema';
import { UserInTaskWhereInputObjectSchema } from './objects/UserInTaskWhereInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './objects/UserInTaskWhereUniqueInput.schema';

export const UserInTaskFindManySchema = z.object({
  select: z.lazy(() => UserInTaskSelectObjectSchema.optional()),
  include: z.lazy(() => UserInTaskIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      UserInTaskOrderByWithRelationInputObjectSchema,
      UserInTaskOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: UserInTaskWhereInputObjectSchema.optional(),
  cursor: UserInTaskWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(UserInTaskScalarFieldEnumSchema).optional(),
});
