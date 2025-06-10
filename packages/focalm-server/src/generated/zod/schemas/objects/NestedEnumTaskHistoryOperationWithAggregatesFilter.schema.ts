import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryOperationSchema } from '../enums/TaskHistoryOperation.schema';
import { NestedEnumTaskHistoryOperationFilterObjectSchema } from './NestedEnumTaskHistoryOperationFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';

const Schema: z.ZodType<Prisma.NestedEnumTaskHistoryOperationWithAggregatesFilter> = z
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
        z.lazy(() => NestedEnumTaskHistoryOperationWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumTaskHistoryOperationFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumTaskHistoryOperationFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumTaskHistoryOperationWithAggregatesFilterObjectSchema = Schema;
