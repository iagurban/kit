import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumCreatedAtFixReasonNullableFilterObjectSchema } from './EnumCreatedAtFixReasonNullableFilter.schema';
import { TaskHistoryValueListRelationFilterObjectSchema } from './TaskHistoryValueListRelationFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TaskHistoryGroupWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TaskHistoryGroupWhereInputObjectSchema),
        z.lazy(() => TaskHistoryGroupWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
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
    values: z.lazy(() => TaskHistoryValueListRelationFilterObjectSchema).optional(),
    author: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional(),
  })
  .strict();

export const TaskHistoryGroupWhereInputObjectSchema = Schema;
