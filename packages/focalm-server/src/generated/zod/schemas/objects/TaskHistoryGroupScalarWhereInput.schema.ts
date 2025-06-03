import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumCreatedAtFixReasonNullableFilterObjectSchema } from './EnumCreatedAtFixReasonNullableFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema),
        z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema),
        z.lazy(() => TaskHistoryGroupScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    taskId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    authorId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    localCreatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    createdAtFixReason: z
      .union([
        z.lazy(() => EnumCreatedAtFixReasonNullableFilterObjectSchema),
        z.lazy(() => CreatedAtFixReasonSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const TaskHistoryGroupScalarWhereInputObjectSchema = Schema;
