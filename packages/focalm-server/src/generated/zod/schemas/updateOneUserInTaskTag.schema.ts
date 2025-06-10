import { z } from 'zod';

import { UserInTaskTagIncludeObjectSchema } from './objects/UserInTaskTagInclude.schema';
import { UserInTaskTagSelectObjectSchema } from './objects/UserInTaskTagSelect.schema';
import { UserInTaskTagUncheckedUpdateInputObjectSchema } from './objects/UserInTaskTagUncheckedUpdateInput.schema';
import { UserInTaskTagUpdateInputObjectSchema } from './objects/UserInTaskTagUpdateInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './objects/UserInTaskTagWhereUniqueInput.schema';

export const UserInTaskTagUpdateOneSchema = z.object({
  select: UserInTaskTagSelectObjectSchema.optional(),
  include: UserInTaskTagIncludeObjectSchema.optional(),
  data: z.union([UserInTaskTagUpdateInputObjectSchema, UserInTaskTagUncheckedUpdateInputObjectSchema]),
  where: UserInTaskTagWhereUniqueInputObjectSchema,
});
