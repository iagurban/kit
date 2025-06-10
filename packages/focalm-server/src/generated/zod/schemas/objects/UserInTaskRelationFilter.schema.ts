import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskWhereInputObjectSchema } from './UserInTaskWhereInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskRelationFilter> = z
  .object({
    is: z
      .lazy(() => UserInTaskWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => UserInTaskWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const UserInTaskRelationFilterObjectSchema = Schema;
