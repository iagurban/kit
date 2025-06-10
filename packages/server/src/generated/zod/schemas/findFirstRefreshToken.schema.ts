import { z } from 'zod';
import { RefreshTokenSelectObjectSchema } from './objects/RefreshTokenSelect.schema';
import { RefreshTokenIncludeObjectSchema } from './objects/RefreshTokenInclude.schema';
import { RefreshTokenOrderByWithRelationInputObjectSchema } from './objects/RefreshTokenOrderByWithRelationInput.schema';
import { RefreshTokenWhereInputObjectSchema } from './objects/RefreshTokenWhereInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './objects/RefreshTokenWhereUniqueInput.schema';
import { RefreshTokenScalarFieldEnumSchema } from './enums/RefreshTokenScalarFieldEnum.schema';

export const RefreshTokenFindFirstSchema = z.object({
  select: RefreshTokenSelectObjectSchema.optional(),
  include: RefreshTokenIncludeObjectSchema.optional(),
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
