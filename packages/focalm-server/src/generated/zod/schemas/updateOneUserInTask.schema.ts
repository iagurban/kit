import { z } from 'zod';

import { UserInTaskIncludeObjectSchema } from './objects/UserInTaskInclude.schema';
import { UserInTaskSelectObjectSchema } from './objects/UserInTaskSelect.schema';
import { UserInTaskUncheckedUpdateInputObjectSchema } from './objects/UserInTaskUncheckedUpdateInput.schema';
import { UserInTaskUpdateInputObjectSchema } from './objects/UserInTaskUpdateInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './objects/UserInTaskWhereUniqueInput.schema';

export const UserInTaskUpdateOneSchema = z.object({
  select: UserInTaskSelectObjectSchema.optional(),
  include: UserInTaskIncludeObjectSchema.optional(),
  data: z.union([UserInTaskUpdateInputObjectSchema, UserInTaskUncheckedUpdateInputObjectSchema]),
  where: UserInTaskWhereUniqueInputObjectSchema,
});
