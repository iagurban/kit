import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { NestedEnumTaskHistoryKeyFilterObjectSchema } from './NestedEnumTaskHistoryKeyFilter.schema';
import { NestedEnumTaskHistoryKeyWithAggregatesFilterObjectSchema } from './NestedEnumTaskHistoryKeyWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema';

const Schema: z.ZodType<Prisma.EnumTaskHistoryKeyWithAggregatesFilter> = z
  .object({
    equals: z.lazy(() => TaskHistoryKeySchema).optional(),
    in: z.union([z.lazy(() => TaskHistoryKeySchema).array(), z.lazy(() => TaskHistoryKeySchema)]).optional(),
    notIn: z
      .union([z.lazy(() => TaskHistoryKeySchema).array(), z.lazy(() => TaskHistoryKeySchema)])
      .optional(),
    not: z
      .union([
        z.lazy(() => TaskHistoryKeySchema),
        z.lazy(() => NestedEnumTaskHistoryKeyWithAggregatesFilterObjectSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumTaskHistoryKeyFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumTaskHistoryKeyFilterObjectSchema).optional(),
  })
  .strict();

export const EnumTaskHistoryKeyWithAggregatesFilterObjectSchema = Schema;
