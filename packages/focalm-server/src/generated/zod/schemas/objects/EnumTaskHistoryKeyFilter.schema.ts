import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';
import { NestedEnumTaskHistoryKeyFilterObjectSchema } from './NestedEnumTaskHistoryKeyFilter.schema';

const Schema: z.ZodType<Prisma.EnumTaskHistoryKeyFilter> = z
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

export const EnumTaskHistoryKeyFilterObjectSchema = Schema;
