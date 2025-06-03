import { z } from 'zod';

import { RefreshTokenCountAggregateInputObjectSchema } from './objects/RefreshTokenCountAggregateInput.schema';
import { RefreshTokenMaxAggregateInputObjectSchema } from './objects/RefreshTokenMaxAggregateInput.schema';
import { RefreshTokenMinAggregateInputObjectSchema } from './objects/RefreshTokenMinAggregateInput.schema';
import { RefreshTokenOrderByWithRelationInputObjectSchema } from './objects/RefreshTokenOrderByWithRelationInput.schema';
import { RefreshTokenWhereInputObjectSchema } from './objects/RefreshTokenWhereInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './objects/RefreshTokenWhereUniqueInput.schema';

export const RefreshTokenAggregateSchema = z.object({
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
  _count: z.union([z.literal(true), RefreshTokenCountAggregateInputObjectSchema]).optional(),
  _min: RefreshTokenMinAggregateInputObjectSchema.optional(),
  _max: RefreshTokenMaxAggregateInputObjectSchema.optional(),
});
