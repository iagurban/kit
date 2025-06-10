import { z } from 'zod';

import { UserInTaskTagScalarFieldEnumSchema } from './enums/UserInTaskTagScalarFieldEnum.schema';
import { UserInTaskTagOrderByWithAggregationInputObjectSchema } from './objects/UserInTaskTagOrderByWithAggregationInput.schema';
import { UserInTaskTagScalarWhereWithAggregatesInputObjectSchema } from './objects/UserInTaskTagScalarWhereWithAggregatesInput.schema';
import { UserInTaskTagWhereInputObjectSchema } from './objects/UserInTaskTagWhereInput.schema';

export const UserInTaskTagGroupBySchema = z.object({
  where: UserInTaskTagWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      UserInTaskTagOrderByWithAggregationInputObjectSchema,
      UserInTaskTagOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: UserInTaskTagScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(UserInTaskTagScalarFieldEnumSchema),
});
