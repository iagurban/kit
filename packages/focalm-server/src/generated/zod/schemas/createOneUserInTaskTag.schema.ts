import { z } from 'zod';

import { UserInTaskTagCreateInputObjectSchema } from './objects/UserInTaskTagCreateInput.schema';
import { UserInTaskTagIncludeObjectSchema } from './objects/UserInTaskTagInclude.schema';
import { UserInTaskTagSelectObjectSchema } from './objects/UserInTaskTagSelect.schema';
import { UserInTaskTagUncheckedCreateInputObjectSchema } from './objects/UserInTaskTagUncheckedCreateInput.schema';

export const UserInTaskTagCreateOneSchema = z.object({
  select: UserInTaskTagSelectObjectSchema.optional(),
  include: UserInTaskTagIncludeObjectSchema.optional(),
  data: z.union([UserInTaskTagCreateInputObjectSchema, UserInTaskTagUncheckedCreateInputObjectSchema]),
});
