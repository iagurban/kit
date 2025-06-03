import { z } from 'zod';

import { RefreshTokenScalarFieldEnumSchema } from './enums/RefreshTokenScalarFieldEnum.schema';
import { RefreshTokenIncludeObjectSchema } from './objects/RefreshTokenInclude.schema';
import { RefreshTokenOrderByWithRelationInputObjectSchema } from './objects/RefreshTokenOrderByWithRelationInput.schema';
import { RefreshTokenSelectObjectSchema } from './objects/RefreshTokenSelect.schema';
import { RefreshTokenWhereInputObjectSchema } from './objects/RefreshTokenWhereInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './objects/RefreshTokenWhereUniqueInput.schema';

export const RefreshTokenFindManySchema = z.object({
  select: z.lazy(() => RefreshTokenSelectObjectSchema.optional()),
  include: z.lazy(() => RefreshTokenIncludeObjectSchema.optional()),
  orderBy: z
    .union([
      RefreshTokenOrderByWithRelationInputObjectSchema,
      RefreshTokenOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: RefreshTokenWhereInputObjectSchema.optional(),
  cursor: RefreshTokenWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(RefreshTokenScalarFieldEnumSchema).optional(),
});
