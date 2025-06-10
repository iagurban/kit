import { z } from 'zod';

import { UserInTaskUpdateManyMutationInputObjectSchema } from './objects/UserInTaskUpdateManyMutationInput.schema';
import { UserInTaskWhereInputObjectSchema } from './objects/UserInTaskWhereInput.schema';

export const UserInTaskUpdateManySchema = z.object({
  data: UserInTaskUpdateManyMutationInputObjectSchema,
  where: UserInTaskWhereInputObjectSchema.optional(),
});
