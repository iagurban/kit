import { z } from 'zod';

import { UserInTaskCreateInputObjectSchema } from './objects/UserInTaskCreateInput.schema';
import { UserInTaskIncludeObjectSchema } from './objects/UserInTaskInclude.schema';
import { UserInTaskSelectObjectSchema } from './objects/UserInTaskSelect.schema';
import { UserInTaskUncheckedCreateInputObjectSchema } from './objects/UserInTaskUncheckedCreateInput.schema';

export const UserInTaskCreateOneSchema = z.object({
  select: UserInTaskSelectObjectSchema.optional(),
  include: UserInTaskIncludeObjectSchema.optional(),
  data: z.union([UserInTaskCreateInputObjectSchema, UserInTaskUncheckedCreateInputObjectSchema]),
});
