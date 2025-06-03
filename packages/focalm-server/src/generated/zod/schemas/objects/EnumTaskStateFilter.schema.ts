import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';
import { NestedEnumTaskStateFilterObjectSchema } from './NestedEnumTaskStateFilter.schema';

const Schema: z.ZodType<Prisma.EnumTaskStateFilter> = z
  .object({
    equals: z.lazy(() => TaskStateSchema).optional(),
    in: z.union([z.lazy(() => TaskStateSchema).array(), z.lazy(() => TaskStateSchema)]).optional(),
    notIn: z.union([z.lazy(() => TaskStateSchema).array(), z.lazy(() => TaskStateSchema)]).optional(),
    not: z
      .union([z.lazy(() => TaskStateSchema), z.lazy(() => NestedEnumTaskStateFilterObjectSchema)])
      .optional(),
  })
  .strict();

export const EnumTaskStateFilterObjectSchema = Schema;
