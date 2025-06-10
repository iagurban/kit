import { z } from 'zod';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '../../../old-client';

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
