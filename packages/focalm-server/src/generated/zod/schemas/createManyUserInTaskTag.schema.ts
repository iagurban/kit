import { z } from 'zod';

import { UserInTaskTagCreateManyInputObjectSchema } from './objects/UserInTaskTagCreateManyInput.schema';

export const UserInTaskTagCreateManySchema = z.object({
  data: z.union([
    UserInTaskTagCreateManyInputObjectSchema,
    z.array(UserInTaskTagCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
