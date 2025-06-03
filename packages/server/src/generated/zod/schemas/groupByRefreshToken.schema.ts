import { z } from 'zod';

import { RefreshTokenScalarFieldEnumSchema } from './enums/RefreshTokenScalarFieldEnum.schema';
import { RefreshTokenOrderByWithAggregationInputObjectSchema } from './objects/RefreshTokenOrderByWithAggregationInput.schema';
import { RefreshTokenScalarWhereWithAggregatesInputObjectSchema } from './objects/RefreshTokenScalarWhereWithAggregatesInput.schema';
import { RefreshTokenWhereInputObjectSchema } from './objects/RefreshTokenWhereInput.schema';

export const RefreshTokenGroupBySchema = z.object({
  where: RefreshTokenWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      RefreshTokenOrderByWithAggregationInputObjectSchema,
      RefreshTokenOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: RefreshTokenScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(RefreshTokenScalarFieldEnumSchema),
});
