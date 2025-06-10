import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryOperationSchema } from '../enums/TaskHistoryOperation.schema';

const Schema: z.ZodType<Prisma.NestedEnumTaskHistoryOperationFilter> = z
  .object({
    equals: z.lazy(() => TaskHistoryOperationSchema).optional(),
    in: z
      .union([z.lazy(() => TaskHistoryOperationSchema).array(), z.lazy(() => TaskHistoryOperationSchema)])
      .optional(),
    notIn: z
      .union([z.lazy(() => TaskHistoryOperationSchema).array(), z.lazy(() => TaskHistoryOperationSchema)])
      .optional(),
    not: z
      .union([
        z.lazy(() => TaskHistoryOperationSchema),
        z.lazy(() => NestedEnumTaskHistoryOperationFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const NestedEnumTaskHistoryOperationFilterObjectSchema = Schema;
