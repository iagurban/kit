import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserInTaskTagScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserInTaskTagScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserInTaskTagScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserInTaskTagScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UserInTaskTagScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    userInTaskId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    tag: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const UserInTaskTagScalarWhereWithAggregatesInputObjectSchema = Schema;
