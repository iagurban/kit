import { z } from 'zod';

import { UserInTaskTagWhereInputObjectSchema } from './objects/UserInTaskTagWhereInput.schema';

export const UserInTaskTagDeleteManySchema = z.object({
  where: UserInTaskTagWhereInputObjectSchema.optional(),
});
