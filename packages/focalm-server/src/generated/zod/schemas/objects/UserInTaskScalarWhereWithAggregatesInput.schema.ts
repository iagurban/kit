import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';

const Schema: z.ZodType<Prisma.UserInTaskScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserInTaskScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserInTaskScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserInTaskScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserInTaskScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserInTaskScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const UserInTaskScalarWhereWithAggregatesInputObjectSchema = Schema;
