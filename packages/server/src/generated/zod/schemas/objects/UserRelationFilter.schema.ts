import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

const Schema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z
      .lazy(() => UserWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => UserWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const UserRelationFilterObjectSchema = Schema;
