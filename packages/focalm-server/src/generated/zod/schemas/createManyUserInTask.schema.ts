import { z } from 'zod';

import { UserInTaskCreateManyInputObjectSchema } from './objects/UserInTaskCreateManyInput.schema';

export const UserInTaskCreateManySchema = z.object({
  data: z.union([UserInTaskCreateManyInputObjectSchema, z.array(UserInTaskCreateManyInputObjectSchema)]),
  skipDuplicates: z.boolean().optional(),
});
