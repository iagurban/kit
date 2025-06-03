import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';

const Schema: z.ZodType<Prisma.NestedEnumTaskHistoryKeyFilter> = z
  .object({
    equals: z.lazy(() => TaskHistoryKeySchema).optional(),
    in: z.union([z.lazy(() => TaskHistoryKeySchema).array(), z.lazy(() => TaskHistoryKeySchema)]).optional(),
    notIn: z
      .union([z.lazy(() => TaskHistoryKeySchema).array(), z.lazy(() => TaskHistoryKeySchema)])
      .optional(),
    not: z
      .union([z.lazy(() => TaskHistoryKeySchema), z.lazy(() => NestedEnumTaskHistoryKeyFilterObjectSchema)])
      .optional(),
  })
  .strict();

export const NestedEnumTaskHistoryKeyFilterObjectSchema = Schema;
