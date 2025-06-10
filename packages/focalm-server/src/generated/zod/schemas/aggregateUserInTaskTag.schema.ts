import { z } from 'zod';

import { UserInTaskTagCountAggregateInputObjectSchema } from './objects/UserInTaskTagCountAggregateInput.schema';
import { UserInTaskTagMaxAggregateInputObjectSchema } from './objects/UserInTaskTagMaxAggregateInput.schema';
import { UserInTaskTagMinAggregateInputObjectSchema } from './objects/UserInTaskTagMinAggregateInput.schema';
import { UserInTaskTagOrderByWithRelationInputObjectSchema } from './objects/UserInTaskTagOrderByWithRelationInput.schema';
import { UserInTaskTagWhereInputObjectSchema } from './objects/UserInTaskTagWhereInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './objects/UserInTaskTagWhereUniqueInput.schema';

export const UserInTaskTagAggregateSchema = z.object({
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
  _count: z.union([z.literal(true), UserInTaskTagCountAggregateInputObjectSchema]).optional(),
  _min: UserInTaskTagMinAggregateInputObjectSchema.optional(),
  _max: UserInTaskTagMaxAggregateInputObjectSchema.optional(),
});
