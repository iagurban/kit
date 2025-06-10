import { z } from 'zod';

import { UserInTaskCreateInputObjectSchema } from './objects/UserInTaskCreateInput.schema';
import { UserInTaskIncludeObjectSchema } from './objects/UserInTaskInclude.schema';
import { UserInTaskSelectObjectSchema } from './objects/UserInTaskSelect.schema';
import { UserInTaskUncheckedCreateInputObjectSchema } from './objects/UserInTaskUncheckedCreateInput.schema';
import { UserInTaskUncheckedUpdateInputObjectSchema } from './objects/UserInTaskUncheckedUpdateInput.schema';
import { UserInTaskUpdateInputObjectSchema } from './objects/UserInTaskUpdateInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './objects/UserInTaskWhereUniqueInput.schema';

export const UserInTaskUpsertSchema = z.object({
  select: UserInTaskSelectObjectSchema.optional(),
  include: UserInTaskIncludeObjectSchema.optional(),
  where: UserInTaskWhereUniqueInputObjectSchema,
  create: z.union([UserInTaskCreateInputObjectSchema, UserInTaskUncheckedCreateInputObjectSchema]),
  update: z.union([UserInTaskUpdateInputObjectSchema, UserInTaskUncheckedUpdateInputObjectSchema]),
});
