import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumCreatedAtFixReasonNullableWithAggregatesFilterObjectSchema } from './EnumCreatedAtFixReasonNullableWithAggregatesFilter.schema';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    authorId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    localCreatedAt: z
      .union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()])
      .optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
    createdAtFixReason: z
      .union([
        z.lazy(() => EnumCreatedAtFixReasonNullableWithAggregatesFilterObjectSchema),
        z.lazy(() => CreatedAtFixReasonSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema = Schema;
