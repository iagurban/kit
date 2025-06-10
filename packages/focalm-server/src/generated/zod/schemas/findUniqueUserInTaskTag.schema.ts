import { z } from 'zod';

import { UserInTaskTagIncludeObjectSchema } from './objects/UserInTaskTagInclude.schema';
import { UserInTaskTagSelectObjectSchema } from './objects/UserInTaskTagSelect.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './objects/UserInTaskTagWhereUniqueInput.schema';

export const UserInTaskTagFindUniqueSchema = z.object({
  select: UserInTaskTagSelectObjectSchema.optional(),
  include: UserInTaskTagIncludeObjectSchema.optional(),
  where: UserInTaskTagWhereUniqueInputObjectSchema,
});
