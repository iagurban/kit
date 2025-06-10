import { z } from 'zod';

import { UserInTaskTagCreateInputObjectSchema } from './objects/UserInTaskTagCreateInput.schema';
import { UserInTaskTagIncludeObjectSchema } from './objects/UserInTaskTagInclude.schema';
import { UserInTaskTagSelectObjectSchema } from './objects/UserInTaskTagSelect.schema';
import { UserInTaskTagUncheckedCreateInputObjectSchema } from './objects/UserInTaskTagUncheckedCreateInput.schema';
import { UserInTaskTagUncheckedUpdateInputObjectSchema } from './objects/UserInTaskTagUncheckedUpdateInput.schema';
import { UserInTaskTagUpdateInputObjectSchema } from './objects/UserInTaskTagUpdateInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './objects/UserInTaskTagWhereUniqueInput.schema';

export const UserInTaskTagUpsertSchema = z.object({
  select: UserInTaskTagSelectObjectSchema.optional(),
  include: UserInTaskTagIncludeObjectSchema.optional(),
  where: UserInTaskTagWhereUniqueInputObjectSchema,
  create: z.union([UserInTaskTagCreateInputObjectSchema, UserInTaskTagUncheckedCreateInputObjectSchema]),
  update: z.union([UserInTaskTagUpdateInputObjectSchema, UserInTaskTagUncheckedUpdateInputObjectSchema]),
});
