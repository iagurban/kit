import { z } from 'zod';

import { UserInTaskScalarFieldEnumSchema } from './enums/UserInTaskScalarFieldEnum.schema';
import { UserInTaskOrderByWithAggregationInputObjectSchema } from './objects/UserInTaskOrderByWithAggregationInput.schema';
import { UserInTaskScalarWhereWithAggregatesInputObjectSchema } from './objects/UserInTaskScalarWhereWithAggregatesInput.schema';
import { UserInTaskWhereInputObjectSchema } from './objects/UserInTaskWhereInput.schema';

export const UserInTaskGroupBySchema = z.object({
  where: UserInTaskWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      UserInTaskOrderByWithAggregationInputObjectSchema,
      UserInTaskOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: UserInTaskScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(UserInTaskScalarFieldEnumSchema),
});
