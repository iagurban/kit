import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.UserInTaskScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserInTaskScalarWhereInputObjectSchema),
        z.lazy(() => UserInTaskScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserInTaskScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserInTaskScalarWhereInputObjectSchema),
        z.lazy(() => UserInTaskScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const UserInTaskScalarWhereInputObjectSchema = Schema;
