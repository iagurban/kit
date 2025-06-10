import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagWhereInputObjectSchema } from './UserInTaskTagWhereInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagListRelationFilter> = z
  .object({
    every: z.lazy(() => UserInTaskTagWhereInputObjectSchema).optional(),
    some: z.lazy(() => UserInTaskTagWhereInputObjectSchema).optional(),
    none: z.lazy(() => UserInTaskTagWhereInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskTagListRelationFilterObjectSchema = Schema;
