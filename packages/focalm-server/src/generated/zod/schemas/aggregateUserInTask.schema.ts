import { z } from 'zod';

import { UserInTaskCountAggregateInputObjectSchema } from './objects/UserInTaskCountAggregateInput.schema';
import { UserInTaskMaxAggregateInputObjectSchema } from './objects/UserInTaskMaxAggregateInput.schema';
import { UserInTaskMinAggregateInputObjectSchema } from './objects/UserInTaskMinAggregateInput.schema';
import { UserInTaskOrderByWithRelationInputObjectSchema } from './objects/UserInTaskOrderByWithRelationInput.schema';
import { UserInTaskWhereInputObjectSchema } from './objects/UserInTaskWhereInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './objects/UserInTaskWhereUniqueInput.schema';

export const UserInTaskAggregateSchema = z.object({
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
  _count: z.union([z.literal(true), UserInTaskCountAggregateInputObjectSchema]).optional(),
  _min: UserInTaskMinAggregateInputObjectSchema.optional(),
  _max: UserInTaskMaxAggregateInputObjectSchema.optional(),
});
