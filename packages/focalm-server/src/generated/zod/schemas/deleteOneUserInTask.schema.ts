import { z } from 'zod';

import { UserInTaskIncludeObjectSchema } from './objects/UserInTaskInclude.schema';
import { UserInTaskSelectObjectSchema } from './objects/UserInTaskSelect.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './objects/UserInTaskWhereUniqueInput.schema';

export const UserInTaskDeleteOneSchema = z.object({
  select: UserInTaskSelectObjectSchema.optional(),
  include: UserInTaskIncludeObjectSchema.optional(),
  where: UserInTaskWhereUniqueInputObjectSchema,
});
