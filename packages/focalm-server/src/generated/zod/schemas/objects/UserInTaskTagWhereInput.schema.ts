import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UserInTaskRelationFilterObjectSchema } from './UserInTaskRelationFilter.schema';
import { UserInTaskWhereInputObjectSchema } from './UserInTaskWhereInput.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserInTaskTagWhereInputObjectSchema),
        z.lazy(() => UserInTaskTagWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserInTaskTagWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserInTaskTagWhereInputObjectSchema),
        z.lazy(() => UserInTaskTagWhereInputObjectSchema).array(),
      ])
      .optional(),
    userInTaskId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    tag: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userInTask: z
      .union([
        z.lazy(() => UserInTaskRelationFilterObjectSchema),
        z.lazy(() => UserInTaskWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserInTaskTagWhereInputObjectSchema = Schema;
