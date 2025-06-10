import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskWhereInputObjectSchema } from './UserInTaskWhereInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskListRelationFilter> = z
  .object({
    every: z.lazy(() => UserInTaskWhereInputObjectSchema).optional(),
    some: z.lazy(() => UserInTaskWhereInputObjectSchema).optional(),
    none: z.lazy(() => UserInTaskWhereInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskListRelationFilterObjectSchema = Schema;
