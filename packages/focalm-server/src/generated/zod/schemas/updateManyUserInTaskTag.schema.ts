import { z } from 'zod';

import { UserInTaskTagUpdateManyMutationInputObjectSchema } from './objects/UserInTaskTagUpdateManyMutationInput.schema';
import { UserInTaskTagWhereInputObjectSchema } from './objects/UserInTaskTagWhereInput.schema';

export const UserInTaskTagUpdateManySchema = z.object({
  data: UserInTaskTagUpdateManyMutationInputObjectSchema,
  where: UserInTaskTagWhereInputObjectSchema.optional(),
});
