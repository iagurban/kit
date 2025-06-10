import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryOperationSchema } from '../enums/TaskHistoryOperation.schema';
import { NestedEnumTaskHistoryOperationFilterObjectSchema } from './NestedEnumTaskHistoryOperationFilter.schema';

const Schema: z.ZodType<Prisma.EnumTaskHistoryOperationFilter> = z
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

export const EnumTaskHistoryOperationFilterObjectSchema = Schema;
